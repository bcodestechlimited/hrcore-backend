import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';

export enum FormQuestionType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  DATE = 'date',
  TIME = 'time',
  FILE = 'file',
  NUMBER = 'number',
  RANGE = 'range',
}

@plugin(mongooseIdValidator)
@pre<FormQuestion>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class FormQuestion {
  @prop({
    required: true,
  })
  public name!: string;

  @prop({})
  public description!: string;

  @prop({ enum: FormQuestionType, required: true })
  public type!: FormQuestionType;

  @prop({
    type: [String],
  })
  public options!: string[];

  @prop({
    default: false,
  })
  public required!: boolean;

  @prop({})
  public order!: number;

  @prop({ ref: () => Form, required: true })
  public form!: Ref<Form>;

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
