import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { canCreateInvoice, canFetchInvoice } from '../invoice/guard';

export const canCreateInvoiceItem = canCreateInvoice;

export const canFetchInvoiceItem = canFetchInvoice
export const canUpdateInvoiceItem = canCreateInvoice;

export const canDeleteInvoiceItem = canCreateInvoice;
