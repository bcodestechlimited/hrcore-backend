import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateMedias: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Medias',
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

export const canFetchMedias: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyStaff(req, exec));
    // console.log(perm, 'perm');
    return {
      auth: true,
      message: 'Can fetch Medias',
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

export const canUpdateMedias = canCreateMedias;

export const canDeleteMedias = canCreateMedias;
