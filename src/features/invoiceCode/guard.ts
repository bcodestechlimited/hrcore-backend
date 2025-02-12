import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateInvoiceCode: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create InvoiceCode',
      query: {
        company: perm.query.company,
        createdBy: req.user._id,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canFetchInvoiceCode: GuardFunction = async (req, exec) => {
  try {
    let query;
    const perm = await isCompanyStaff(req, true);
    query = {
      company: perm.query.company,
      // createdBy: req.user._id,
    };
    // if (!perm.auth) {
    //   const perm = throwPermIfError(await isCompanyAdmin(req, true));
    //   query = {
    //     company: perm.query.company,
    //   };
    // }
    return {
      auth: true,
      message: '',
      query,
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canUpdateInvoiceCode: GuardFunction = canCreateInvoiceCode;

export const canDeleteInvoiceCode: GuardFunction = canCreateInvoiceCode;
