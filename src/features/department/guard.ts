import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { PermType } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwIfError, throwPermIfError } from '../../utilities/response';

export const canCreateDepartment = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    console.log('req.user in createDepa', req.user);
    throwPermIfError(await isCompanyAdmin(req, true));
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Department',
      query: {},
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message || "Can't create Department",
      query: {},
    };
  }
};

export const canFetchDepartment = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<
  PermType<{
    company?: string | undefined;
  }>
> => {
  try {
    const perm = throwPermIfError(await isCompanyStaff(req, false));
    return {
      auth: true,
      message: 'Can fetch Department',
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

export const canUpdateDepartment = canCreateDepartment;

export const canDeleteDepartment = canCreateDepartment;
