import { NextFunction, Request, Response } from 'express';
import {
  checkUserTypes,
  checkUserTypesService,
} from '../../middlewares/authentication';
import { PermType } from '../../guards';

export const canCreateLeave = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create Leave',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't create Leave",
      query: {},
    };
  }
};

export const canFetchLeave = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch Leave',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't fetch Leave",
      query: {},
    };
  }
};

export const canUpdateLeave = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update Leave',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't update Leave",
      query: {},
    };
  }
};

export const canDeleteLeave = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete Leave',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message:
        error instanceof Error ? error.message : "Can't delete Leave",
      query: {},
    };
  }
};
