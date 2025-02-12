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
@pre<VoucherAccount>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class VoucherAccount {

  @prop({  })
  public bankName!: string;

  @prop({  })
  public bankAccountName!: string;

  @prop({  })
  public bankAccountNumber!: string;

  @prop({ })
  public bankSortCode!: string;

  @prop({ })
  public bankIban!: string;

  @prop({ })
  public bankTIN!: string;


  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;


  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}


