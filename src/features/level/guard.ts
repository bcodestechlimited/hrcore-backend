import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { PermType } from '../../guards';
import { isCompanyAdmin, isCompanyStaff } from '../company/guard';
import { throwIfError, throwPermIfError } from '../../utilities/response';

export const canCreateLevel = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    throwPermIfError(await isCompanyAdmin(req, true));

    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Level',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't create Level",
      query: {},
    };
  }
};

export const canFetchLevel = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  try {
    // await checkUserTypesService(req, ['super']);
    const perm = throwPermIfError(await isCompanyStaff(req, false));
    return {
      auth: true,
      message: 'Can fetch Level',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch Level",
      query: {},
    };
  }
};

export const canUpdateLevel = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update Level',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't update Level",
      query: {},
    };
  }
};

export const canDeleteLevel = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete Level',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't delete Level",
      query: {},
    };
  }
};
