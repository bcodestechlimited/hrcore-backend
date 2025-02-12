import response, { throwIfError } from '../utilities/response';
import lodash from 'lodash';

import { find, findOne } from '../utilities/query';
import { matched } from '../middlewares/validators';

import User from '../models/userModel';

import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Permission from '../models/permissionModel';
import Role from '../models/role.model';
import mailService from '../services/mailService';
import ControlService from './control.service';
import { Types } from 'mongoose';

// Fetch permissions
exports.fetchPermissions = async (
  req: { query: any },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const data = await find(Permission, req.query);
    return response(res, 200, 'Permissions fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

exports.fetchPermissionById = async (
  req: { query: any; params: { id: any } },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const permission = await findOne(Permission, req.query, {
      _id: req.params.id,
    });
    if (!permission) {
      return response(res, 404, 'Permission not found');
    }
    return response(res, 200, 'Permission fetched successfully', permission);
  } catch (error) {
    next(error);
  }
};

exports.updatePermission = async (
  req: { params: { id: any }; body: Pick<any, 'status'> },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  const { id } = req.params;
  try {
    req.body = {
      status: req.body.status,
    };
    const permission = await Permission.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!permission) {
      return response(res, 404, 'Permission not found');
    }
    await permission.save();
    return response(res, 200, 'Permission updated successfully', permission);
  } catch (error) {
    next(error);
  }
};

// role CRUD
exports.createRole = async (
  req: { body: any },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const role = await Role.create(req.body);
    return response(res, 201, 'Role created successfully', role);
  } catch (error) {
    next(error);
  }
};

exports.fetchRoles = async (
  req: { query: any },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const data = await find(Role, req.query);
    return response(res, 200, 'Roles fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

exports.fetchRoleById = async (
  req: { query: any; params: { id: any } },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const role = await findOne(Role, req.query, { _id: req.params.id });
    if (!role) {
      return response(res, 404, 'Role not found');
    }
    return response(res, 200, 'Role fetched successfully', role);
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (
  req: { params: { id: any }; body: { name: any } },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  const { id } = req.params;
  try {
    if (req.body.name) {
      let existingRole = await Role.findOne({ name: req.body.name });
      if (existingRole && existingRole._id != id) {
        return response(res, 400, 'Role with name already exists');
      }
    }
    const role = await Role.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!role) {
      return response(res, 404, 'Role not found');
    }
    await role.save();
    return response(res, 200, 'Role updated successfully', role);
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (
  req: { params: { id: any } },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    let defaultRole = await Role.findOne({ slug: 'default' });
    if (defaultRole) {
      await User.updateMany({ role: req.params.id }, { role: null });
    }
    return response(res, 200, 'Role deleted successfully');
  } catch (error) {
    next(error);
  }
};

// assign role to admins
exports.assignRoleToAdmins = async (
  req: { params: { id: any }; body: { adminIds: any } },
  res: Response<any, Record<string, any>>,
  next: (arg0: unknown) => void,
) => {
  try {
    const { id } = req.params;
    const { adminIds } = req.body;
    let role = await Role.findById(id);
    if (!role) {
      return response(res, 404, 'Role not found');
    }
    let admins = await User.find({ _id: { $in: adminIds } });
    if (admins.length != adminIds.length) {
      return response(res, 404, 'Admin not found');
    }
    await User.updateMany(
      { _id: { $in: adminIds } },
      { $set: { role: role._id } },
    );
    return response(res, 200, 'Role assigned to admins successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers: async (
    req: { query: any },
    res: Response<any, Record<string, any>>,
    next: (arg0: unknown) => void,
  ) => {
    try {
      const users = await find(User, req.query);
      return response(res, 200, 'Users fetched successfully', users);
    } catch (error) {
      next(error);
    }
  },

  updateUserStatus: async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: (arg0: unknown) => void,
  ) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  sendEmail: async (
    req: { body: { email: any; subject: any; message: any } },
    res: Response<any, Record<string, any>>,
    next: (arg0: unknown) => void,
  ) => {
    try {
      const { email, subject, message } = req.body;
      await mailService(subject, email, message);
      return response(res, 200, 'Email sent successfully');
    } catch (error) {
      next(error);
    }
  },

  addAdmin: async (
    req: { body: { password: any } },
    res: Response<any, Record<string, any>>,
    next: (arg0: unknown) => void,
  ) => {
    try {
      const user = await User.register(
        new User({
          ...req.body,
          isAdmin: true,
          status: 'active',
          type: 'admin',
        }),
        req.body.password,
      );

      return response(res, 200, 'Admin added successfully', user);
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (
    req: Request,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const token = await user?.generateJWT();
      return response(res, 200, 'User logged in successfully', {
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
