import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';


export class InvoiceFields {
  @prop({})
  public header!: string;

  @prop({})
  public value!: any;
}

@plugin(mongooseIdValidator)
@pre<InvoiceItem>('save', function (next) {
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class InvoiceItem {
  @prop({})
  public name!: string;

  @prop()
  public po!: string;
  @prop({})
  public quantity!: number;

  @prop({})
  public price!: number;

  @prop({ type: () => [InvoiceFields] })
  public fields!: InvoiceFields[];

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

}
