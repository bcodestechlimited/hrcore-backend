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
@pre<InvoiceContact>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class InvoiceContact {

  @prop({ required: true })
  public name!: string;

  @prop()
  public email!: string;

  @prop()
  public address!: string;

  @prop()
  public attention!: string;


  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;
  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}


