import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyAdminOrStaff, isCompanyStaff } from '../company/guard';

export const canCreateAnnouncement: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Announcement',
      query: {
        createdBy: req.user._id,
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

export const canFetchAnnouncement: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdminOrStaff(req, true));
    return {
      auth: true,
      message: 'Can fetch Announcement',
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

export const canUpdateAnnouncement: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    return {
      auth: true,
      message: 'Can update Announcement',
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

export const canDeleteAnnouncement: GuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    return {
      auth: true,
      message: 'Can delete Announcement',
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
