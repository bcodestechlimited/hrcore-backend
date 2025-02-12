import {
  prop,
  plugin,
  pre,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

@plugin(mongooseIdValidator)
@pre<LeaveType>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class LeaveType {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({})
  public days!: number;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

// export const LeaveTypeModel = getModelForClass(LeaveType);
