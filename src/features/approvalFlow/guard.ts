import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateApprovalFlow: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create ApprovalFlow',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't create ApprovalFlow",
      query: {},
    };
  }
};

export const canFetchApprovalFlow: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch ApprovalFlow',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch ApprovalFlow",
      query: {},
    };
  }
};

export const canUpdateApprovalFlow: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update ApprovalFlow',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't update ApprovalFlow",
      query: {},
    };
  }
};

export const canDeleteApprovalFlow: GuardFunction = async (req) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete ApprovalFlow',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't delete ApprovalFlow",
      query: {},
    };
  }
};
