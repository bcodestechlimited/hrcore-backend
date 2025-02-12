import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

export const canCreateGrade: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'staff']);
    // throw new Error('Not implemented');
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    return {
      auth: true,
      message: 'Can create Position',
      query: {
        ...perm.query,
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

export const canFetchGrade: GuardFunction = async (req, exec) => {
  try {
    const perm = await isCompanyStaff(req, false);
    if (!perm.auth) {
      if (!req.query.company) {
        throw new Error('Company is required');
      }
      perm.query = {
        company: req.query.company as any,
      };
    }
    return {
      auth: true,
      message: 'Can fetch Department',
      query: {
        ...perm.query,
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

export const canUpdateGrade: GuardFunction = canCreateGrade;

export const canDeleteGrade: GuardFunction = canCreateGrade;
