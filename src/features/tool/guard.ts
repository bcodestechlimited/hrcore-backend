import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateTool: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    await isCompanyAdmin(req, exec);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Tool',
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

export const canFetchTool: GuardFunction<
  any,
  any,
  { companyId: string }
> = async (req) => {
  try {
    await isCompanyStaff(req, true);
    return {
      auth: true,
      message: 'Can fetch Tool',
      query: {
        company: req.params.companyId,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch Tool",
      query: {},
    };
  }
};

export const canUpdateTool = canCreateTool;

export const canDeleteTool = canCreateTool;
