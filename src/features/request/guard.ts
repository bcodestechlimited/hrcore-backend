import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateRequest: GuardFunction = async (req, exec) => {
  try {
    const perm = await isCompanyAdmin(req, true);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Request',
      query: {
        company: perm.query.company,
        createdBy: req.user?._id,
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

export const canFetchRequest: GuardFunction = async (req, exec) => {
  try {
    const perm = await isCompanyStaff(req, true);
    return {
      auth: true,
      message: 'Can fetch Request',
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

export const canUpdateRequest = canCreateRequest;

export const canDeleteRequest = canCreateRequest;
