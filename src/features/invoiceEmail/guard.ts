import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import {
  canCreateInvoice,
  canDeleteInvoice,
  canFetchInvoice,
  canUpdateInvoice,
} from '../invoice/guard';
import { canFetchInvoiceCode } from '../invoiceCode/guard';

export const canCreateInvoiceEmail = canCreateInvoice;

export const canFetchInvoiceEmail = canFetchInvoiceCode;

export const canUpdateInvoiceEmail = canUpdateInvoice;
export const canDeleteInvoiceEmail = canDeleteInvoice;
