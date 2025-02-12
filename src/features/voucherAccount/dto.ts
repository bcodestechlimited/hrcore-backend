import { IsOptional } from 'class-validator';
import { VoucherAccount } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateVoucherAccountDto
  implements Omit<Required<VoucherAccount>, 'createdBy' | 'company'>
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
}

doc['/'] = {
  POST: {
    schema: CreateVoucherAccountDto.name,
  },
};

export class UpdateVoucherAccountDto
  implements Omit<CreateVoucherAccountDto, ''> {
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
  }

doc['/:id'] = {
  PUT: {
    schema: UpdateVoucherAccountDto.name,
  },
};

export const docs = doc;
