import { IsOptional } from 'class-validator';
import { VoucherCompanies } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Company } from '../company/model';

const doc: IDocs = {};

export class CreateVoucherCompaniesDto
  implements Omit<Required<VoucherCompanies>, 'createdBy' | 'company'>
{
  @IsOptional()
  public name: string;
}

doc['/'] = {
  POST: {
    schema: CreateVoucherCompaniesDto.name,
  },
};

export class UpdateVoucherCompaniesDto
  implements Omit<CreateVoucherCompaniesDto, ''>
{
  @IsOptional()
  public name: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateVoucherCompaniesDto.name,
  },
};

export const docs = doc;
