import { Request } from 'express';
import { checkUserTypesService } from '../../middlewares/authentication';
import { PermType } from '../../guards';
import { Company } from './model';
import { throwPermIfError } from '../../utilities/response';
import { QuerySelector } from 'mongoose';
import { CompanyModel } from '../../models';

export const canCreateCompany = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can create Company',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't create Company",
      query: {},
    };
  }
};

export const canFetchCompany = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch Company',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't fetch Company",
      query: {},
    };
  }
};

export const isCompanyAdmin = async (
  req: Request<{
    companyId?: string;
  }>,
  exec: boolean,
): Promise<
  PermType<
    {
      [key: string]: QuerySelector<Company> | string | undefined;
      _id?: string;
    },
    Company
  >
> => {
  try {
    await checkUserTypesService(req, ['super', 'staff']);
    const companyId =
      req.params.companyId || req.headers.companyid || req.headers.companyId;
    const data: PermType<
      {
        [key: string]: QuerySelector<Company> | string;
      },
      Company
    > = {
      auth: true,
      message: 'Access granted',
      query: req.user?.isAdmin
        ? {}
        : {
            admins: {
              $in: [req.user._id as any],
            },
            _id: companyId as any,
          },
    };

    const company = await CompanyModel.findOne({
      _id: companyId,
      ...data.query,
    });
    console.log('company in isCompanyAdmin', company, data.query);
    if (!company) {
      throw {
        message: 'Access denied',
        statusCode: 401,
      };
    }

    return {
      ...data,
      query: {
        ...data.query,
        company: company._id as any,
      },
      data: company,
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message || "Can't delete Company",
      query: {},
    };
  }
};

type companyType =
  | 'admins'
  | 'staffs'
  | 'managers'
  | 'executive'
  | 'manager1s'
  | 'manager2s';

export const isCompanyPriv = async (
  req: Request<{
    companyId?: string;
  }>,
  type: companyType[],
): Promise<
  PermType<
    {
      [key: string]: QuerySelector<Company> | string | undefined;
      _id?: string;
    },
    Company
  >
> => {
  try {
    await checkUserTypesService(req, ['super', 'staff']);
    const queries: any = {};

    type.forEach((type) => {
      queries.$or = [
        ...(queries.$or || []),
        {
          [type]: {
            $in: [req.user._id],
          },
        },
      ];
    });

    const companyId =
      req.params.companyId || req.headers.companyid || req.headers.companyId;
    const data: PermType<
      {
        [key: string]: QuerySelector<Company> | string;
      },
      Company
    > = {
      auth: true,
      message: 'Access granted',
      query: req.user?.isAdmin
        ? {}
        : {
            ...queries,
            _id: companyId as any,
          },
    };

    const company = await CompanyModel.findOne({
      _id: companyId,
      ...data.query,
    });
    if (!company) {
      throw {
        message: 'Access denied',
        statusCode: 401,
      };
    }

    return {
      ...data,
      query: {
        ...data.query,
        company: company._id as any,
      },
      data: company,
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message || "Can't delete Company",
      query: {},
    };
  }
};

export const isCompanyStaff = async (
  req: Request<{
    companyId?: string;
  }>,
  exec: boolean,
): Promise<
  PermType<
    {
      [key: string]: QuerySelector<Company>;
    },
    Company
  >
> => {
  try {
    await checkUserTypesService(req, ['super', 'staff']);
    const companyId =
      req.params.companyId || req.headers.companyid || req.headers.companyId;
    const data: PermType<
      {
        [key: string]: QuerySelector<Company>;
      },
      Company
    > = {
      auth: true,
      message: 'Access Granted',
      query: req.user?.isAdmin
        ? {}
        : {
            staffs: {
              $in: [req.user._id as any],
            },
            _id: companyId as any,
          },
    };

    // if (exec === false) {
    //   return data;
    // }
    console.log('data.query', data.query);
    const company = await CompanyModel.findOne({
      _id: companyId,
      ...data.query,
      // admins: {
      //   $in: [req.user._id],
      // },
    });
    if (!company) {
      throw {
        message: 'Access denied',
        statusCode: 401,
      };
    }

    return {
      ...data,
      query: {
        ...data.query,
        company: company._id as any,
      },
      data: company,
    };
  } catch (error: any) {
    return {
      auth: false,
      message: error.message || "Can't delete Company",
      query: {},
    };
  }
};

// isCompanyAdmin Or isCompany staff
export const isCompanyAdminOrStaff = async (
  req: Request<{
    companyId?: string;
  }>,
  exec: boolean,
): Promise<
  PermType<
    any,
    Company & {
      isAdmin: boolean;
    }
  >
> => {
  const isAdmin = await isCompanyAdmin(req, exec);
  let data: PermType<
    {
      [key: string]: QuerySelector<Company> | string | undefined;
      _id?: string;
    },
    Company
  >;
  if (isAdmin.auth) {
    data = isAdmin;
  } else {
    data = await isCompanyStaff(req, exec);
  }
  return {
    ...data,
    data: {
      ...(data?.data as any),
      isAdmin: isAdmin.auth,
    },
  };
};

export const canUpdateCompany = async (
  req: Request<{
    companyId: string;
  }>,
): Promise<PermType> => {
  const perm = throwPermIfError(await isCompanyAdmin(req, false));
  try {
    return {
      auth: true,
      message: 'Can update Company',
      query: {
        ...perm.query,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't update Company",
      query: {},
    };
  }
};

export const canDeleteCompany = async (req: Request): Promise<PermType> => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete Company',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error instanceof Error ? error.message : "Can't delete Company",
      query: {},
    };
  }
};
