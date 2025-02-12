import { IsOptional } from 'class-validator';
import { InvoiceContact } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateInvoiceContactDto
  implements Omit<InvoiceContact, 'createdBy' | 'company'>
{
  @IsOptional()
  public attention: string;
  @IsOptional()
  public name: string;
  @IsOptional()
  public email: string;
  @IsOptional()
  public address: string;
  // export class CreateInvoiceContactDto implements Partial<InvoiceContact> {
}
export class UpdateInvoiceContactDto implements Partial<InvoiceContact> {
  //export class UpdateInvoiceContactDto implements Partial<InvoiceContact> {
}
