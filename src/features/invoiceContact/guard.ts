import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { canCreateInvoice, canFetchInvoice } from '../invoice/guard';
import { canFetchInvoiceCode } from '../invoiceCode/guard';

export const canCreateInvoiceContact = canCreateInvoice;

export const canFetchInvoiceContact = canFetchInvoiceCode;

export const canUpdateInvoiceContact = canCreateInvoice;
export const canDeleteInvoiceContact = canCreateInvoice;