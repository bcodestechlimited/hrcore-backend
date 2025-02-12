import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { VoucherCompanies } from '../voucherCompanies/schema';
import { VoucherAccount } from '../voucherAccount/schema';

@plugin(mongooseIdValidator)
@pre<Voucher>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Voucher {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ immutable: true, unique: true })
  public number!: string;

  @prop({})
  public admin!: string;

  @prop({ ref: () => VoucherCompanies })
  public receipient!: Ref<VoucherCompanies>;

  @prop({ ref: () => User })
  public sender!: Ref<User>;

  @prop({})
  public amount!: number;

  @prop({})
  public wordAmount!: string;

  @prop({})
  public currency!: string;

  @prop({ ref: () => VoucherAccount })
  public payingBank!: Ref<VoucherAccount>;

  @prop({})
  public checkNumber!: string;

  @prop({})
  public message!: string;

  @prop({ default: false })
  public approved!: boolean;

  @prop({ default: false })
  public endorsed!: boolean;

  @prop({
    ref: () => User,
  })
  public approvedBy!: Ref<User>;

  @prop({
    ref: () => User,
  })
  public endorsedBy!: Ref<User>;

  @prop({
    ref: () => User,
  })
  public updatedBy!: Ref<User>;

  @prop({})
  public description!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
