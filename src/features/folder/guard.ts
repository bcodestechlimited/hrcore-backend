import { GuardFunction } from '../../guards';
import { isCompanyAdmin } from '../company/guard';

export const canCreateFolder: GuardFunction<
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
      message: 'Can create Folder',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't create Folder",
      query: {},
    };
  }
};

export const canFetchFolder: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    const perm = await isCompanyAdmin(req, true);
    let query = {};
    if (perm.auth) {
      query = { company: req.params.companyId };
    } else {
      // TODO: Filter by levels
      query = { createdBy: req.user._id };
    }
    return {
      auth: true,
      message: 'Can fetch Folder',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch Folder",
      query: {},
    };
  }
};

export const canUpdateFolder = canCreateFolder;

export const canDeleteFolder = canCreateFolder;
