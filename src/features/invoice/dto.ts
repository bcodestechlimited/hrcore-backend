import { IsOptional } from 'class-validator';
import { Invoice, InvoiceStatus, InvoiceTemplate } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { InvoiceContact } from '../invoiceContact/schema';
import { InvoiceItem } from '../invoiceItem/schema';
import { InvoiceTag } from '../invoiceTag/schema';
import { Company } from '../company/model';
import { InvoiceAccount } from '../invoiceAccount/schema';
import { InvoiceEmail } from '../invoiceEmail/schema';

export class CreateInvoiceDto
  implements Omit<Required<Invoice>, 'company' | 'createdBy' | 'status'>
{
  @IsOptional()
  public po: string;
  @IsOptional()
  public title: string;
  @IsOptional()
  public includeServiceCharge: boolean;
  @IsOptional()
  public serviceCharge: string;
  @IsOptional()
  public email: Ref<InvoiceEmail>[];
  @IsOptional()
  public address: string;
  @IsOptional()
  totalAmount: number;
  @IsOptional()
  totalCharge: number;
  @IsOptional()
  amountInWords: string;
  @IsOptional()
  currency: string;
  @IsOptional()
  public tin: string;
  @IsOptional()
  public companyName: string;
  @IsOptional()
  public phone: string;
  @IsOptional()
  public template: InvoiceTemplate;
  @IsOptional()
  public accounts: Ref<InvoiceAccount>[];
  @IsOptional()
  public dueDate: Date;
  @IsOptional()
  public includeVat: boolean;
  @IsOptional()
  public invoiceId: string;
  @IsOptional()
  public vat: string;
  @IsOptional()
  public contacts: Ref<InvoiceContact>[];
  @IsOptional()
  public tags: Ref<InvoiceTag>[];
  @IsOptional()
  public items: Ref<InvoiceItem>[];
  // export class CreateInvoiceDto implements Partial<Invoice> {
}
// export class UpdateInvoiceDto implements Partial<Invoice> {
// extend CreateInvoiceDto
export class UpdateInvoiceDto extends CreateInvoiceDto {}
