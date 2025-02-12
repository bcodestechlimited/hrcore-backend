import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import {
  canCreateInvoice,
  canFetchInvoice,
  canUpdateInvoice,
} from '../invoice/guard';

export const canCreateVoucherAccount: GuardFunction = canCreateInvoice;

export const canFetchVoucherAccount: GuardFunction = canFetchInvoice;

export const canUpdateVoucherAccount: GuardFunction = canUpdateInvoice;

export const canDeleteVoucherAccount: GuardFunction = canUpdateInvoice;
