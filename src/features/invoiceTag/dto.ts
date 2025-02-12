import { IsOptional } from 'class-validator';
import { InvoiceTag } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';

export class CreateInvoiceTagDto
  implements Omit<InvoiceTag, 'createdBy' | 'company'>
{
  @IsOptional()
  public name: string;
}
export class UpdateInvoiceTagDto implements Partial<InvoiceTag> {
  //export class UpdateInvoiceTagDto implements Partial<InvoiceTag> {
}
