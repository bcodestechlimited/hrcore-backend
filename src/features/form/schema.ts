import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';

@plugin(mongooseIdValidator)
@pre<Form>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Form {
  @prop({})
  public name?: string;

  @prop({})
  public description?: string;

  // @prop({ ref : () => Question })
  // public questions!: Ref<Question>[];

  @prop({ immutable: true, ref: () => User })
  public createdBy?: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
