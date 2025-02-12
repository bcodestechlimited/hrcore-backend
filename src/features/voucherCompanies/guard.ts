import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateVoucherCompanies: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create VoucherCompanies',
      query: {
        createdBy: req.user._id,
        company: perm.query.company,
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

export const canFetchVoucherCompanies: GuardFunction = async (req, exec) => {
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

export const canUpdateVoucherCompanies: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    return {
      auth: true,
      message: 'Can update VoucherCompanies',
      query: {
        company: perm.query.company,
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

export const canDeleteVoucherCompanies: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    return {
      auth: true,
      message: 'Can delete VoucherCompanies',
      query: {
        company: perm.query.company,
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
