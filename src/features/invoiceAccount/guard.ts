import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { canCreateInvoice, canFetchInvoice } from '../invoice/guard';
import { canFetchInvoiceCode } from '../invoiceCode/guard';

export const canCreateInvoiceAccount = canCreateInvoice;

export const canFetchInvoiceAccount = canFetchInvoiceCode;

export const canUpdateInvoiceAccount = canCreateInvoice;

export const canDeleteInvoiceAccount = canCreateInvoice;
