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
@pre<Tool>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Tool {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  public name!: string;

  @prop()
  public description?: string;

  @prop()
  public imageUri?: string;

  @prop()
  public assetId?: string;

  @prop()
  public details?: string;

  @prop({ required: true, ref: () => User })
  public users!: Ref<User>[];

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const ToolModel = getModelForClass(Tool);
