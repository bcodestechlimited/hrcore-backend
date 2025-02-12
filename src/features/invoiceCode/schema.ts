import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export enum InvoiceTemplate {
  FLEET = 'fleet',
  RECRUITMENT = 'recruitment',
  UNILEVER = 'unilever',
  LEGAL = 'legal',
  TRAINING = 'training',
  CRYSTALCHECK = 'crystalcheck',
  CLIENT = 'client',
}

@plugin(mongooseIdValidator)
@pre<InvoiceCode>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class InvoiceCode {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ enum: InvoiceTemplate, required: true, unique: true })
  public type!: InvoiceTemplate;

  @prop({ required: true })
  public code!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
