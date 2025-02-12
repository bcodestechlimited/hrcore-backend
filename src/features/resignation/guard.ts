import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateResignation: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    await isCompanyStaff(req, true);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Resignation',
      query: {
        company: req.params.companyId,
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

export const canFetchResignation: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    const compAdmin = await isCompanyAdmin(req, true);
    let query = {};

    if (compAdmin.auth) {
      query = {
        company: req.params.companyId,
      };
    } else {
      query = {
        company: req.params.companyId,
        createdBy: req.user._id,
      };
    }
    return {
      auth: true,
      message: 'Can fetch Resignation',
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

export const canUpdateResignation = canFetchResignation;

export const canDeleteResignation: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    await isCompanyAdmin(req, true);
    return {
      auth: true,
      message: 'Can delete Resignation',
      query: {
        company: req.params.companyId,
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
