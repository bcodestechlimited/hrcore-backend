import { IsOptional } from 'class-validator';
import { InvoiceAccount } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';

export class CreateInvoiceAccountDto
  implements Omit<InvoiceAccount, 'createdBy' | 'company'>
{
  @IsOptional()
  public bankName: string;
  @IsOptional()
  public bankAccountName: string;
  @IsOptional()
  public bankAccountNumber: string;
  @IsOptional()
  public bankSortCode: string;
  @IsOptional()
  public bankIban: string;
  @IsOptional()
  public bankTIN: string;
  // export class CreateInvoiceAccountDto implements Partial<InvoiceAccount> {
}
export class UpdateInvoiceAccountDto implements Partial<InvoiceAccount> {
  //export class UpdateInvoiceAccountDto implements Partial<InvoiceAccount> {
}
