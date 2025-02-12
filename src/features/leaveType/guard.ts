import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { PermType } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwIfError, throwPermIfError } from '../../utilities/response';

export const canCreateLeaveType = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    // await checkUserTypesService(req, ['super']);
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create LeaveType',
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

export const canFetchLeaveType = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    // await checkUserTypesService(req, ['super']);
    const perm = throwPermIfError(await isCompanyStaff(req, false));
    return {
      auth: true,
      message: 'Can fetch LeaveType',
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

export const canUpdateLeaveType = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update LeaveType',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't update LeaveType",
      query: {},
    };
  }
};

export const canDeleteLeaveType = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete LeaveType',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't delete LeaveType",
      query: {},
    };
  }
};
