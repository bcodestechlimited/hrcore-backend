import { IsOptional } from 'class-validator';
import { InvoiceCode } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Company } from '../company/model';
import { InvoiceTemplate } from '../invoice/schema';

const doc: IDocs = {};

export class CreateInvoiceCodeDto
  implements Omit<Required<InvoiceCode>, 'createdBy' | 'company'>
{
  @IsOptional()
  public type: InvoiceTemplate;
  @IsOptional()
  public code: string;
}

doc['/'] = {
  POST: {
    schema: CreateInvoiceCodeDto.name,
  },
};

export class UpdateInvoiceCodeDto implements Omit<CreateInvoiceCodeDto, ''> {
  @IsOptional()
  public type: InvoiceTemplate;
  @IsOptional()
  public code: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateInvoiceCodeDto.name,
  },
};

export const docs = doc;
