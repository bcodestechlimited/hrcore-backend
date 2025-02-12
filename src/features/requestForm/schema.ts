import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { LeaveRequestStatus } from '../leaveRequest/model';
import { Company } from '../company/model';
import { Request } from '../request/schema';

@plugin(mongooseIdValidator)
@pre<RequestForm>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class RequestForm {
  @prop()
  public startDate?: Date;

  @prop()
  public endDate?: Date;

  @prop()
  public justification?: string;

  @prop({ immutable: true, ref: () => User })
  public reliever!: Ref<User>;

  // TODO: Create status enum
  @prop({ default: LeaveRequestStatus.PENDING })
  public status?: LeaveRequestStatus;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({
    required: true,
    ref: () => User,
    // Ensure that the approvers are unique and must be greater than 0
    validate: {
      validator: (v: Ref<User>[]) => {
        return v.length > 0 && new Set(v).size === v.length;
      },
      message: 'Approvers must be unique and greater than 0',
    },
  })
  public approvers!: Ref<User>[];

  @prop({ ref: () => User })
  public nextApprover?: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({})
  public description!: string;

  @prop({})
  public amount!: number;

  @prop({})
  public title!: string;

  @prop({ ref: () => Request, required: true, immutable: true })
  public request!: Ref<Request>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
