import {
  prop,
  getModelForClass,
  plugin,
  pre,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { LeaveType } from '../leaveType/model';
import { Company } from '../company/model';

export enum LeaveRequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@plugin(mongooseIdValidator)
@pre<LeaveRequest>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class LeaveRequest {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => LeaveType })
  public leaveType!: Ref<LeaveType>;

  @prop()
  public startDate?: Date;

  @prop()
  public endDate?: Date;

  @prop()
  public justification?: string;

  @prop({ required: true, immutable: true, ref: () => User })
  public reliever!: Ref<User>;

  // TODO: Create status enum
  @prop({ default: 'Pending' })
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

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
