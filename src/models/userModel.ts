import {
  prop,
  getModelForClass,
  Ref,
  DocumentType,
  plugin,
} from '@typegoose/typegoose';
import passportLocalMongoose from 'passport-local-mongoose';
import idValidator from 'mongoose-id-validator2';
import { signJWT } from '../utilities/jwt';
import { PassportLocalDocument, PassportLocalModel, Types } from 'mongoose';
import { Department } from '../features/department/model';
import { Level } from '../features/level/model';
import { Position } from '../features/position/model';
import { Grade } from '../features/grade/schema';
import { File } from '../features/file/schema';
import { Company } from '../features/company/model';

const options = {
  errorMessages: {
    MissingPasswordError: 'Incorrect details. Kindly double check',
    AttemptTooSoonError: 'Account is currently locked. Try again later',
    TooManyAttemptsError:
      'Account locked due to too many failed login attempts',
    NoSaltValueStoredError:
      "You've registered using other login method. Please login with that method",
    IncorrectPasswordError: 'Incorrect details. Kindly double check',
    IncorrectUsernameError: 'Incorrect details. Kindly double check',
    MissingUsernameError: 'Incorrect details. Kindly double check',
    UserExistsError: 'A user with this credential already exists',
  },
};

export class Education {
  @prop({ required: true })
  institution!: string;

  @prop({})
  courseOfStudy!: string;

  @prop({})
  qualification!: string;

  @prop({})
  startDate!: Date;

  @prop({})
  endDate!: Date;
}

export class Experience {
  @prop({ required: true })
  company!: string;

  @prop({})
  position!: string;

  @prop({})
  startDate!: Date;

  @prop({})
  endDate!: Date;
  
}

export class Qualification {
  @prop({ required: true })
  name!: string;

  @prop({})
  description!: string;

  @prop({})
  startDate!: Date;

  @prop({})
  endDate!: Date;
}

export class Certification {
  @prop({ required: true })
  name!: string;

  @prop({})
  description!: string;

  @prop({})
  startDate!: Date;

  @prop({})
  endDate!: Date;
}

export class Certificate {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, ref: () => File })
  document!: Ref<File>;

  @prop({})
  description!: string;

  @prop({})
  startDate!: Date;

  @prop({})
  endDate!: Date;
}

export type UserModelType = typeof UserModel &
  PassportLocalModel<DocumentType<User>>;

export enum UserTypes {
  STAFF = 'staff',
  SUPER = 'super',
  ADMIN = 'admin',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@plugin(idValidator)
@plugin(passportLocalMongoose, {
  ...options,
  usernameField: 'email',
  attemptsField: 'loginAttempts',
  lastLoginField: 'lastLogin',
  usernameLowerCase: true,
})
export class User {
  @prop({
    unique: true,
    immutable: true,
    index: true,
    sparse: true,
    required: true,
    source: 'body',
    comment: "This is an email only for the user's login",
  })
  email!: string;

  @prop()
  lastLogin?: string;

  @prop({ default: false, immutable: true })
  emailVerified!: boolean;

  @prop({
    enum: UserTypes,
    immutable: true,
    required: true,
  })
  type!: UserTypes;

  @prop({ default: false, immutable: true, type: Boolean })
  isAdmin!: boolean;

  @prop({
    enum: Status,
    immutable: false,
    default: function () {
      const mythis = this as any;
      if (mythis.type === 'student') {
        return 'active';
      }
      return 'inactive';
    },
  })
  status!: Status;

  @prop({ ref: 'Role' })
  roles?: Ref<'Role'>[];

  @prop({ ref: 'Permission' })
  permissions?: Ref<'Permission'>[];

  @prop({
    required: function () {
      const mythis = this;
      if (mythis.type !== 'super' && mythis.type !== 'admin') {
        return true;
      }
      return false;
    },
    immutable: true,
    ref: () => Company,
  })
  public company!: Ref<Company>;

  @prop({})
  firstName!: string;

  @prop({})
  lastName!: string;

  @prop()
  personalEmail?: string;

  @prop({
    unique: true,
  })
  employeeId?: string;

  @prop({
    ref: () => Level,
  })
  level?: Ref<Level>;

  @prop({
    ref: () => Department,
  })
  department?: Ref<Department>;

  @prop({
    ref: () => Position,
  })
  position?: Ref<Position>;

  @prop({
    ref: () => Position,
  })
  gradeForPosition1?: Ref<Position>[];

  @prop({
    ref: () => Position,
  })
  gradeForPosition2?: Ref<Position>[];

  @prop({
    ref: () => Grade,
  })
  grade?: Ref<Grade>;

  @prop()
  probationPeriod?: Date;

  @prop()
  avatar?: string;

  @prop()
  phone?: string;

  @prop()
  address?: string;

  @prop()
  lgaOfOrigin?: string;

  @prop()
  stateOfOrigin?: string;

  @prop()
  stateOfResidence?: string;

  @prop()
  country?: string;

  @prop()
  zip?: string;

  @prop()
  gender?: string;

  @prop()
  maritalStatus?: string;

  @prop()
  weddingAnniversary?: Date;

  @prop()
  weddingAnniversaryMonth?: string;

  @prop()
  weddingAnniversaryDay?: string;

  @prop()
  dateOfBirth?: Date;

  @prop()
  birthMonth?: string;

  @prop()
  birthDay?: string;

  //TODO: Work on Branch

  @prop()
  pension?: string;

  @prop()
  pensionNumber?: string;

  @prop()
  onHMOScheme?: boolean;

  @prop()
  hmoProvider?: string;

  @prop()
  hmoNumber?: string;

  @prop()
  hmoId?: string;

  @prop()
  hmoPlan?: string;

  @prop()
  hmoHospital?: string;

  @prop()
  accountNumber?: string;

  @prop()
  accountName?: string;

  @prop()
  hmoStatus?: string;

  @prop({ type: () => [Education] })
  education?: Education[];

  @prop({ type: () => [Experience] })
  experience?: Experience[];

  @prop({ type: () => [Qualification] })
  qualifications?: Qualification[];

  @prop({ type: () => [Certification] })
  certifications?: Certification[];

  @prop({ type: () => [Certificate] })
  certificates?: Certificate[];

  public async generateJWT(this: DocumentType<User>): Promise<string> {
    const payload = {
      id: this._id,
    };
    if (this.isAdmin) {
      return signJWT(
        payload,
        process.env.ADMIN_JWT_SECRET,
        process.env.ADMIN_TOKEN_EXPIRY,
      );
    }
    return signJWT(
      payload,
      process.env.USER_JWT_SECRET,
      process.env.USER_TOKEN_EXPIRY,
    );
  }

  public toJSON(this: DocumentType<User>) {
    const user = this.toObject() as UserType | any;
    delete user.salt;
    delete user.hash;
    delete user.__v;
    delete user.deleted;
    return user;
  }
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    //   getters: true,
    // },
  },
});

export type UserType = DocumentType<User>;
export type AllUserType = PassportLocalDocument & DocumentType<User>;

export default <UserModelType>UserModel;
