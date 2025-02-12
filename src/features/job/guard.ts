import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin } from '../company/guard';

export const canCreateJob: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    const perm = await isCompanyAdmin(req, exec);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Job',
      query: {
        // ...perm.query,
        company: req.params.companyId,
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

export const canFetchJob: GuardFunction<
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
      message: 'Can fetch Job',
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

export const canUpdateJob = canCreateJob;

export const canDeleteJob = canCreateJob;
