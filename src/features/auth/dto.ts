import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Department } from '../department/model';
import { Level } from '../level/model';
import { Position } from '../position/model';
import { Grade } from '../grade/schema';
import {
  Certification,
  Qualification,
  User,
  Certificate,
  Education,
  Experience,
} from '../../models/userModel';

const doc: IDocs = {};
export class RegisterDto
  implements
    Omit<
      Required<User>,
      | 'createdBy'
      | 'type'
      | 'gradeForPosition1'
      | 'gradeForPosition2'
      | 'lastLogin'
      | 'emailVerified'
      | 'isAdmin'
      | 'permissions'
      | 'generateJWT'
      | 'status'
      | 'roles'
      | 'toJSON'
      | 'company'
    >
{
  @IsOptional()
  accountNumber: string;
  @IsOptional()
  accountName: string;
  @IsOptional()
  qualifications: Qualification[];
  @IsOptional()
  certifications: Certification[];
  @IsOptional()
  certificates: Certificate[];
  @IsOptional()
  grade: Ref<Grade>;
  @IsOptional()
  weddingAnniversaryMonth: string;
  @IsOptional()
  weddingAnniversaryDay: string;
  @IsOptional()
  birthMonth: string;
  @IsOptional()
  birthDay: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsOptional()
  personalEmail: string;
  @IsOptional()
  employeeId: string;
  @IsOptional()
  level: Ref<Level>;
  @IsOptional()
  department: Ref<Department>;
  @IsOptional()
  position: Ref<Position>;
  @IsOptional()
  probationPeriod: Date;
  @IsOptional()
  avatar: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  address: string;
  @IsOptional()
  lgaOfOrigin: string;
  @IsOptional()
  stateOfOrigin: string;
  @IsOptional()
  stateOfResidence: string;
  @IsOptional()
  country: string;
  @IsOptional()
  zip: string;
  @IsOptional()
  gender: string;
  @IsOptional()
  maritalStatus: string;
  @IsOptional()
  weddingAnniversary: Date;
  @IsOptional()
  dateOfBirth: Date;
  @IsOptional()
  pension: string;
  @IsOptional()
  pensionNumber: string;
  @IsOptional()
  onHMOScheme: boolean;
  @IsOptional()
  hmoProvider: string;
  @IsOptional()
  hmoNumber: string;
  @IsOptional()
  hmoId: string;
  @IsOptional()
  hmoPlan: string;
  @IsOptional()
  hmoHospital: string;
  @IsOptional()
  hmoStatus: string;
  @IsOptional()
  education: Education[];
  @IsOptional()
  experience: Experience[];
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @IsNotEmpty()
  @IsString()
  public password!: string;

  @IsMongoId()
  companyId!: string;
}
doc['/register-staff'] = {
  POST: {
    schema: RegisterDto.name,
    description: 'Register a staff',
  },
};
export class LoginDto {
  // export class CreateAuthDto implements Partial<Auth> {
  @IsNotEmpty()
  @IsString()
  public username!: string;

  @IsNotEmpty()
  public password!: string;
}
doc['/login'] = {
  POST: {
    schema: LoginDto.name,
    description: `
    {"username": "admin@hrcore.com", "password":"Super@1234"}
    Ordinary Staff:
    {
      "username": "olawalejuwon@gmail.com",
      "password": "Juwon@1234"
    }
    Staff 1
   
    {
      "username": "olawale.juwon@gmail.com",
      "password": "Juwon@1234"
    }

    Manager 2
    {
      "username": "olawalejuwo.n@gmail.com",
      "password": "Juwon@1234"
    }

    {
      "username": "olawalejuwonm@gmail.com",
      "password": "OlawaleMic"
    }
    `,
  },
};

doc['/login-admin'] = {
  POST: {
    description: `
    {
      "email":"olawalejuwon@gmail.com"
    }
    `,
  },
};
export class ChangePasswordDto {
  @IsNotEmpty()
  public oldPassword!: string;

  @IsNotEmpty()
  public newPassword!: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  public token!: string;

  @IsNotEmpty()
  public newPassword!: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  public email!: string;
}

export class VerifyEmailDto {
  @IsNotEmpty()
  public token!: string;
}

export class VerifyEmailResendDto {
  @IsNotEmpty()
  public email!: string;
}

export const docs = doc;

doc['/py/:path'] = {
  POST: {
    description: `
    Fetch banks: bank
    Resolve account: bank/resolve?account_number=2105963019&bank_code=033
    `,
  },
};
