import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreatePerformanceReview: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyStaff(req, exec));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: '',
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

export const canFetchPerformanceReview: GuardFunction = async (req, exec) => {
  try {
    let query;
    const perm = await isCompanyStaff(req, true);


    query = {
      company: perm.query.company,
      // createdBy: req.user._id,
    };
    if (!perm.auth) {
      console.log("Permission isn't staff");
      const perm = throwPermIfError(await isCompanyAdmin(req, true));

      query = {
        company: perm.query.company,
      };
    }

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

export const canUpdatePerformanceReview: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'staff']);
    return {
      auth: true,
      message: 'Can update PerformanceReview',
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

export const canDeletePerformanceReview: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete PerformanceReview',
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
