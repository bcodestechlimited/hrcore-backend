import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { InvoiceContact } from '../invoiceContact/schema';
import { InvoiceTag } from '../invoiceTag/schema';
import { InvoiceItem } from '../invoiceItem/schema';
import { Company } from '../company/model';
import { InvoiceAccount } from '../invoiceAccount/schema';
import { InvoiceEmail } from '../invoiceEmail/schema';

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  OPEN = 'open',
  CLOSED = 'closed',
}

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
@pre<Invoice>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Invoice {
  @prop({ required: true })
  public dueDate!: Date;

  @prop({})
  public po!: string;

  @prop({ required: true })
  public includeVat!: boolean;

  @prop({})
  public title!: string;

  @prop({})
  public includeServiceCharge!: boolean;

  @prop()
  public invoiceId!: string;

  @prop({})
  public vat!: string;

  @prop({})
  public serviceCharge!: string;

  @prop({})
  totalAmount!: number;

  @prop({})
  totalCharge!: number;

  @prop({})
  amountInWords!: string;

  @prop({})
  currency!: string;

  @prop({})
  public tin!: string;

  @prop({})
  public companyName!: string;

  @prop({})
  public address!: string;

  @prop({ ref: () => InvoiceEmail })
  public email!: Ref<InvoiceEmail>[];

  @prop({})
  public phone!: string;

  @prop({ ref: () => InvoiceContact })
  public contacts?: Ref<InvoiceContact>[];

  @prop({ ref: () => InvoiceTag })
  public tags?: Ref<InvoiceTag>[];

  @prop({ ref: () => InvoiceItem })
  public items?: Ref<InvoiceItem>[];

  @prop({ ref: () => InvoiceAccount })
  public accounts!: Ref<InvoiceAccount>[];

  @prop({ enum: InvoiceStatus, default: InvoiceStatus.OPEN })
  public status?: InvoiceStatus;

  @prop({ enum: InvoiceTemplate, required: true })
  public template?: InvoiceTemplate;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
