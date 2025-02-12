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
import { Company } from '../company/model';
import { Position } from '../position/model';
import { Flow } from '../flow/model';

@plugin(mongooseIdValidator)
@pre<ApprovalFlow>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class ApprovalFlow {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Position, unique: true })
  public position!: Ref<Position>;

  @prop({
    required: true,
    // validate that it must not be empty
    validate: {
      validator: function (v: any) {
        return v && v.length > 0;
      },
      message: 'Approvers must not be empty',
    },
    type: [Number],
  })
  public approvers!: number[];

  @prop()
  public description?: string;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true, immutable: true, ref: () => Flow })
  public flow!: Ref<Flow>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const ApprovalFlowModel = getModelForClass(ApprovalFlow);
