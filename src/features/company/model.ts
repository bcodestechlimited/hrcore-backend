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

@plugin(mongooseIdValidator)
@pre<Company>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Company {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true })
  public name!: string;

  @prop({ default: [], ref: () => User })
  staffs?: Ref<User>[];

  @prop({ default: [], ref: () => User })
  admins?: Ref<User>[];

  @prop({ default: [], ref: () => User })
  managers?: Ref<User>[];

  @prop({ default: [], ref: () => User })
  manager1s?: Ref<User>[];

  @prop({ default: [], ref: () => User })
  manager2s?: Ref<User>[];

  @prop({ default: [], ref: () => User })
  executive?: Ref<User>[];

  @prop({})
  public website!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}