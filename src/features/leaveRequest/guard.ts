import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin } from '../company/guard';

export const canCreateLeaveRequest: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create LeaveRequest',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't create LeaveRequest",
      query: {},
    };
  }
};

export const canFetchLeaveRequest: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    const perm = await isCompanyAdmin(req, true);
    let query = perm.auth
      ? {
          company: req.params.companyId,
        }
      : { createdBy: req.user._id };
    return {
      auth: true,
      message: 'Can fetch LeaveRequest',
      query: { ...query },
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't fetch LeaveRequest",
      query: {},
    };
  }
};

export const canUpdateLeaveRequest: GuardFunction<
  any,
  any,
  {
    companyId: string;
    id: string;
  }
> = canFetchLeaveRequest;

export const canDeleteLeaveRequest: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete LeaveRequest',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't delete LeaveRequest",
      query: {},
    };
  }
};
