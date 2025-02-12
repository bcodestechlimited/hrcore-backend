import { NextFunction, Request, Response } from 'express';
import {
  authenticateCheck,
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { throwMiddleware } from '../../utilities';
import { GuardFunction, PermType } from '../../guards';
import { isCompanyAdmin } from '../company/guard';

export const canCreateUser = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can create User',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't create User",
      query: {},
    };
  }
};

export const canFetchUser = async (req: Request): Promise<PermType> => {
  try {
    await authenticateCheck(req);
    return {
      auth: true,
      message: 'Can fetch User',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch User",
      query: {},
    };
  }
};

export const canUpdateUser: GuardFunction<
  any,
  any,
  {
    companyId: string;
    id: string;
  }
> = async (req) => {
  try {
    // await checkUserTypesService(req, ['super']);
    const compAdmin = await isCompanyAdmin(req, true);
    if (!compAdmin.auth) {
      // check if req.user._id === req.params.userId
      // if ((req.user._id?.toString()) !== req.params.id) {
      //   throw new Error("Can't update User");
      // }
      throw new Error("Not an admin");

    }
    return {
      auth: true,
      message: 'Can update User',
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

export const canDeleteUser = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete User',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't delete User",
      query: {},
    };
  }
};
