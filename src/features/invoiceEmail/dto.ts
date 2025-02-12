import { IsEmail, IsOptional } from 'class-validator';
import { InvoiceEmail } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateInvoiceEmailDto
  implements Omit<Required<InvoiceEmail>, 'createdBy' | 'company'>
{
  @IsEmail()
  email: string;
}

doc['/'] = {
  POST: {
    schema: CreateInvoiceEmailDto.name,
  },
};

export class UpdateInvoiceEmailDto implements Omit<CreateInvoiceEmailDto, ''> {
  @IsOptional()
  @IsEmail()
  email: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateInvoiceEmailDto.name,
  },
};

export const docs = doc;
