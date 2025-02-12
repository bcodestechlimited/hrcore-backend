import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';
import { isCompanyAdmin } from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateQr: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
  try {
    // throw new Error('Not implemented');
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    return {
      auth: true,
      message: 'Can create Qr',
      query: {
        ...perm.query,
      },
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canFetchQr: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    await isCompanyAdmin(req, true);
    return {
      auth: true,
      message: 'Can fetch Qr',
      query: {},
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canUpdateQr: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update Qr',
      query: {},
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canDeleteQr: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete Qr',
      query: {},
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};
