import { IsOptional } from 'class-validator';
import { Voucher } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { InvoiceAccount } from '../invoiceAccount/schema';
import { User } from '../../models/userModel';
import { VoucherCompanies } from '../voucherCompanies/schema';

const doc: IDocs = {};

export class CreateVoucherDto
  implements
    Omit<
      Required<Voucher>,
      | 'createdBy'
      | 'approved'
      | 'company'
      | 'approvedBy'
      | 'endorsedBy'
      | 'updatedBy'
      | 'endorsed'
    >
{
  @IsOptional()
  public receipient: Ref<VoucherCompanies>;
  @IsOptional()
  public payingBank: Ref<InvoiceAccount>;
  @IsOptional()
  public sender: Ref<User>;
  @IsOptional()
  public wordAmount: string;
  @IsOptional()
  public checkNumber: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public number: string;
  @IsOptional()
  public admin: string;
  @IsOptional()
  public amount: number;
  @IsOptional()
  public currency: string;
  @IsOptional()
  public message: string;
}

doc['/'] = {
  POST: {
    schema: CreateVoucherDto.name,
    description: 'Create a new voucher',
  },
};

export class UpdateVoucherDto implements Omit<CreateVoucherDto, ''> {
  @IsOptional()
  public receipient: Ref<VoucherCompanies>;
  @IsOptional()
  public payingBank: Ref<InvoiceAccount>;
  @IsOptional()
  public sender: Ref<User>;
  @IsOptional()
  public wordAmount: string;
  @IsOptional()
  public checkNumber: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public number: string;
  @IsOptional()
  public admin: string;

  @IsOptional()
  public amount: number;
  @IsOptional()
  public currency: string;
  @IsOptional()
  public message: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateVoucherDto.name,
  },
};

export class UpdateVoucherStatusDto {
  @IsOptional()
  public approved: boolean;
}

doc['/:id/admin'] = {
  PUT: {
    schema: UpdateVoucherStatusDto.name,
  },
};
export const docs = doc;
