import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';
import { FormQuestion } from '../formQuestion/schema';

@plugin(mongooseIdValidator)
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Answers {
  @prop({
    ref: () => FormQuestion,
  })
  public question!: Ref<FormQuestion>;

  @prop({
    type: [String],
  })
  public responses!: string[];
}

@plugin(mongooseIdValidator)
@pre<FormResponse>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class FormResponse {
  @prop({ ref: () => Form, required: true })
  public form!: Ref<Form>;

  @prop({
    type: [Answers],
  })
  public answers!: Answers[];

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
