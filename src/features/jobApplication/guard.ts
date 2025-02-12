import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin } from '../company/guard';

export const canCreateJobApplication: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    // await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create JobApplication',
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

export const canFetchJobApplication: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    await isCompanyAdmin(req, exec);
    return {
      auth: true,
      message: 'Can fetch JobApplication',
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

export const canUpdateJobApplication = canCreateJobApplication;

export const canDeleteJobApplication = canCreateJobApplication;
