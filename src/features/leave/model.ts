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

@plugin(mongooseIdValidator)
@pre<Leave>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Leave {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => LeaveType })
  public leaveType!: Ref<LeaveType>;

  @prop()
  public startDate!: Date;

  @prop()
  public endDate!: Date;

  @prop()
  public reason!: string;

  @prop({ required: true, ref: () => User })
  public reliever!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const LeaveModel = getModelForClass(Leave);
