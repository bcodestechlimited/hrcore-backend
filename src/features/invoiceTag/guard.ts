import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { canCreateInvoice, canFetchInvoice } from '../invoice/guard';
import { canFetchInvoiceCode } from '../invoiceCode/guard';

export const canCreateInvoiceTag = canCreateInvoice;

export const canFetchInvoiceTag = canFetchInvoiceCode;
export const canUpdateInvoiceTag = canCreateInvoice;

export const canDeleteInvoiceTag = canCreateInvoice;
