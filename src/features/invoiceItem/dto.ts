import { IsOptional } from 'class-validator';
import { InvoiceFields, InvoiceItem } from './schema';

export class CreateInvoiceItemDto
  implements Omit<Required<InvoiceItem>, 'createdBy' | 'company'>
{
  @IsOptional()
  public fields: InvoiceFields[];
  @IsOptional()
  public quantity: number;
  @IsOptional()
  public po: string;
  @IsOptional()
  public price: number;
  @IsOptional()
  public name: string;

  // export class CreateInvoiceItemDto implements Partial<InvoiceItem> {
}
export class UpdateInvoiceItemDto implements Partial<InvoiceItem> {
  //export class UpdateInvoiceItemDto implements Partial<InvoiceItem> {
}
