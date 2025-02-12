import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { GuardFunction, PermType } from '../../guards';
import { throwPermIfError } from '../../utilities/response';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';

type comGuardFunction = GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
>;
export const canCreatePosition: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req, exec) => {
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
      message: error instanceof Error ? error.message : "Can't create Position",
      query: {},
    };
  }
};

export const canFetchPosition: comGuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyStaff(req, exec));
    return {
      auth: true,
      message: 'Can fetch Position',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch Position",
      query: {},
    };
  }
};

export const canUpdatePosition: comGuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    return {
      auth: true,
      message: 'Can update Position',
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

export const canDeletePosition: comGuardFunction = async (req, exec) => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, exec));
    return {
      auth: true,
      message: 'Can delete Position',
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
