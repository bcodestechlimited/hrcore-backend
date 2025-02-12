import {
  authenticateCheck,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import {
  isCompanyAdmin,
  isCompanyPriv,
  isCompanyStaff,
} from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateVoucher: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyStaff(req, exec));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Voucher',
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

export const canFetchVoucher: GuardFunction = async (req, exec) => {
  try {
    let perm: any = await isCompanyPriv(req, [
      'managers',
      'admins',
      'executive',
    ]);
    let query;
    if (perm.auth === true) {
      query = {
        company: perm.query.company,
      };
    } else {
      // perm = throwPermIfError(await isCompanyStaff(req, true));
      // query = {
      //   company: perm.query.company,
      //   createdBy: req.user._id,
      // };
    }
    return {
      auth: true,
      message: 'Can fetch Voucher',
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

export const canApproveVoucher: GuardFunction = async (req, exec) => {
  try {
    let perm: any = throwPermIfError(await isCompanyPriv(req, ['managers']));
    let query;
    query = {
      company: perm.query.company,
    };

    return {
      auth: true,
      message: 'Can fetch Voucher',
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

export const canEndorseVoucher: GuardFunction = async (req, exec) => {
  try {
    let perm: any = throwPermIfError(await isCompanyPriv(req, ['executive']));
    let query;
    query = {
      company: perm.query.company,
    };

    return {
      auth: true,
      message: 'Can fetch Voucher',
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

export const canUpdateVoucher = canFetchVoucher;

export const canDeleteVoucher = canFetchVoucher;
