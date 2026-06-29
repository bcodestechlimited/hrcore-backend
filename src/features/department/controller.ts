import express, { Request, Response } from 'express';
import {
  canCreateDepartment,
  canDeleteDepartment,
  canFetchDepartment,
  canUpdateDepartment,
} from './guard';
import DepartmentService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { checkUserTypesService } from '../../middlewares/authentication';
import { isCompanyAdmin } from '../company/guard';
const router = express.Router();
const DepartmentPathName = '/Department';
router.post(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canCreateDepartment(req));
    const content = throwIfError(
      await DepartmentService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    // const perm = throwPermIfError(await canFetchDepartment(req));
    // console.log('perm', perm);
    const content = throwIfError(
      await DepartmentService.fetch(req.query, {
        // company: perm.query?.company,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
router.get('/', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const content = throwIfError(
    await DepartmentService.fetch(req.query, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});



router.put(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      [key: string]: any;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    // console.log('perm', perm);
    const content = throwIfError(
      await DepartmentService.updateOne(
        { _id: req.params.id, company: perm.query.company },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.delete(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await DepartmentService.deleteOne(req.params.id, {
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
