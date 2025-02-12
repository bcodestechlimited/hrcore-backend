import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateInvoice: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Invoice',
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

export const canFetchInvoice: GuardFunction = async (req, exec) => {
  try {
    let query;
    const perm = await isCompanyStaff(req, true);
    query = {
      company: perm.query.company,
      createdBy: req.user._id,
    };
    if (!perm.auth) {
      const perm = throwPermIfError(await isCompanyAdmin(req, true));
      query = {
        company: perm.query.company,
      };
    }
    return {
      auth: true,
      message: 'Can fetch VoucherCompanies',
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

export const canUpdateInvoice = canCreateInvoice;

export const canDeleteInvoice = canCreateInvoice;
