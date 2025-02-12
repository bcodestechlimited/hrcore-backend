import express, { Request, Response } from 'express';
import { canCreateUser, canDeleteUser, canUpdateUser } from './guard';
import { validateDTO } from '../../middlewares/validate';
import { CreateUserDto, UpdateUserDto } from './dto';
import UserService from './service';
import response, { throwPermIfError } from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyStaff } from '../company/guard';
import { authenticate } from '../../middlewares/authentication';
import UserModel from '../../models/userModel';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateUser(req));
  const body = validateDTO(CreateUserDto, req.body);
  const data = await UserService.create({
    ...body,
    createdBy: req.user._id,
  });
  return response(res, 201, 'User created successfully', data);
});

router.get('/', authenticate, async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  
  const data = await UserService.fetchOne(req.query, {
    _id: req.user._id,
  });
  return response(res, 200, 'Users fetched successfully', data);
});

router.get(
  '/users/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyStaff(req, true));
    const data = await UserService.fetch(req.query, {
      _id: {
        $in: perm.data?.staffs || [],
      },
    });
    return response(res, 200, 'Users fetched successfully', data);
  },
);

router.put(
  '/',
  authenticate,
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const payload = validateDTO(UpdateUserDto, req.body);
    const data = await UserService.updateOne({ _id: req.user._id }, payload);
    return response(res, 200, 'User updated successfully', data);
  },
);

router.put(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canUpdateUser(req, true));
    const data = await UserService.updateOne({ _id: req.params.id }, req.body);
    return response(res, 200, 'User updated successfully', data);
  },
);

router.delete('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canDeleteUser(req));
  const data = await UserService.deleteOne(req.params.id, {
    createdBy: req.user._id,
  });
  return response(res, 200, 'User deleted successfully', data);
});

export default router;
