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
import { Department } from '../department/model';
import { Company } from '../company/model';
import { Level } from '../level/model';

@plugin(mongooseIdValidator)
@pre<LeaveFlow>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class LeaveFlow {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Level })
  public level: Ref<Level>;

  @prop({
    required: true,
    ref: () => Level,
    //minimum one approver
    validate: {
      validator: (v: any) => {
        return v && v.length > 0;
      },
      message: 'At least one approver is required',
    },
  })
  public approvers: Ref<Level>[];

  @prop({ required: true, ref: () => Company })
  public company: Ref<Company>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const LeaveFlowModel = getModelForClass(LeaveFlow);
