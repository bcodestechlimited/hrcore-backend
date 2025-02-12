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

@plugin(mongooseIdValidator)
@pre<Flow>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Flow {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  public name!: string;

  @prop()
  public description?: string;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // TODO: Flow should be based on requests

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const FlowModel = getModelForClass(Flow);
