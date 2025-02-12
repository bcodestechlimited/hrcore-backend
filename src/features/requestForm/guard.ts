import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateRequestForm: GuardFunction = async (req, exec) => {
  try {
    let perm = throwPermIfError(await isCompanyStaff(req, true));
    let query;
    query = {
      company: perm.query.company,
      createdBy: req.user._id,
    };

    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create RequestForm',
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

export const canFetchRequestForm: GuardFunction = async (req, exec) => {
  try {
    let perm: any = await isCompanyStaff(req, true);
    let query;
    if (perm.auth === true)
      query = {
        company: perm.query.company,
        createdBy: req.user._id,
      };
    else {
      perm = throwPermIfError(await isCompanyAdmin(req, true));
      query = {
        company: perm.query.company,
      };
    }
    return {
      auth: true,
      message: 'Can fetch RequestForm',
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

export const canUpdateRequestForm: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update RequestForm',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canDeleteRequestForm: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete RequestForm',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};
