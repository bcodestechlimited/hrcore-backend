import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { GuardFunction, PermType } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwPermIfError } from '../../utilities/response';

export const canCreateLeaveFlow = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create LeaveFlow',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't create LeaveFlow",
      query: {},
    };
  }
};

export const canFetchLeaveFlow: GuardFunction<
  any,
  any,
  {
    companyId: string;
  }
> = async (req) => {
  try {
    // await checkUserTypesService(req, ['super']);
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    return {
      auth: true,
      message: 'Can fetch LeaveFlow',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch LeaveFlow",
      query: {},
    };
  }
};

export const canUpdateLeaveFlow = async (req: Request): Promise<PermType> => {
  try {
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    return {
      auth: true,
      message: 'Can update LeaveFlow',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't update LeaveFlow",
      query: {},
    };
  }
};

export const canDeleteLeaveFlow = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete LeaveFlow',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't delete LeaveFlow",
      query: {},
    };
  }
};
