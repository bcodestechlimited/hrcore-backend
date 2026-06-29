import express, { Request, Response } from 'express';
import {
  canCreateCompany,
  canDeleteCompany,
  canFetchCompany,
  canUpdateCompany,
  isCompanyAdmin,
} from './guard';
import CompanyService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { validateDTO } from '../../middlewares/validate';
import { AddManagerDTO, RemoveManagerDTO, UpdateCompanyDto } from './dto';
import {
  authenticateCheck,
  checkUserTypesService,
} from '../../middlewares/authentication';
import AuthService from '../auth/service';
import UserService from '../user/service';
import { RegisterDto } from '../auth/dto';
const router = express.Router();
const CompanyPathName = '/Company';
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateCompany(req));
  const content = throwIfError(
    await CompanyService.create(req.body, { createdBy: req.user._id }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  await authenticateCheck(req);
  const content = throwIfError(
    await CompanyService.fetch(req.query, {
      staffs: {
        $in: [req.user._id],
      },
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canFetchCompany(req));
  const content = throwIfError(
    await CompanyService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put(
  '/:companyId',
  async (req: Request<{ companyId: string }>, res: Response) => {
    throwPermIfError(await canUpdateCompany(req));
    const body = validateDTO(UpdateCompanyDto, req.body, {
      whitelist: false,
    });
    const content = throwIfError(
      await CompanyService.updateOne(
        { _id: req.params.companyId },
        body,
        req.user.type !== 'staff' ? { ...req.body } : {},
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.delete(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canDeleteCompany(req));
    const content = throwIfError(
      await CompanyService.deleteOne(req.params.companyId, {}),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.put('/add/admin/:id/:userId', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const content = throwIfError(
    await CompanyService.updateOne(
      { _id: req.params.id },
      {},
      {
        $addToSet: {
          admins: req.params.userId,
          staffs: req.params.userId,
        },
      },
    ),
  );
  // console.log(req.params.id, req.params.userId);
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/add/manager/:id/:userId', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const content = throwIfError(
    await CompanyService.updateOne(
      { _id: req.params.id },
      {},
      {
        $addToSet: {
          managers: req.params.userId,
          staffs: req.params.userId,
        },
      },
    ),
  );

  return response(res, content.statusCode, content.message, content.data);
});
router.put('/add/manager1/:id/:userId', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const body = validateDTO(AddManagerDTO, req.body);

 const content = throwIfError(
    await UserService.updateUser(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: {
          gradeForPosition1: body.gradeForPosition,
        },
      },
      {
        runValidators: false,
        new: true,
      },
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});
router.put(
  '/remove/manager1/:id/:userId',
  async (req: Request, res: Response) => {
    await checkUserTypesService(req, ['super']);
    const body = validateDTO(RemoveManagerDTO, req.body);
    const content = throwIfError(
      await UserService.updateUser(
        {
          _id: req.params.userId,
        },
        {
          $pullAll: {
            gradeForPosition1: body.gradeForPosition,
          },
        },
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.put('/add/manager2/:id/:userId', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const body = validateDTO(AddManagerDTO, req.body);

 const content = throwIfError(
    await UserService.updateUser(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: {
          gradeForPosition2: body.gradeForPosition,
        },
      },
      {
        runValidators: false,
        new: true,
      },
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put(
  '/remove/manager2/:id/:userId',
  async (req: Request, res: Response) => {
    await checkUserTypesService(req, ['super']);
    const payload = validateDTO(RemoveManagerDTO, req.body);
    // remove from gradeForPosition
    const content = throwIfError(
      await UserService.updateUser(
        {
          _id: req.params.userId,
        },
        {
          // $pull: {
          //   gradeForPosition2: payload.gradeForPosition,
          // },
          // pull each gradeForPosition in payload.gradeForPosition array
          $pullAll: {
            gradeForPosition2: payload.gradeForPosition,
          },
        },
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.put(
  '/add/executive/:id/:userId',
  async (req: Request, res: Response) => {
    await checkUserTypesService(req, ['super']);
    const content = throwIfError(
      await CompanyService.updateOne(
        { _id: req.params.id },
        {},
        {
          $addToSet: {
            executive: req.params.userId,
            staffs: req.params.userId,
          },
        },
        {
          runValidators: false,
          new: true,
        },
      ),
    );
    // console.log(req.params.id, req.params.userId);
    return response(res, content.statusCode, content.message, content.data);
  },
);
// remove admin
router.put('/remove/admin/:id/:userId', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super']);
  const content = throwIfError(
    await CompanyService.updateOne(
      { _id: req.params.id },
      {},
      {
        $pull: {
          admins: req.params.userId,
        },
      },
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put(
  '/remove/manager/:id/:userId',
  async (req: Request, res: Response) => {
    await checkUserTypesService(req, ['super']);
    const content = throwIfError(
      await CompanyService.updateOne(
        { _id: req.params.id },
        {},
        {
          $pull: {
            managers: req.params.userId,
          },
        },
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
router.put(
  '/remove/executive/:id/:userId',
  async (req: Request, res: Response) => {
    await checkUserTypesService(req, ['super']);
    const content = throwIfError(
      await CompanyService.updateOne(
        { _id: req.params.id },
        {},
        {
          $pull: {
            executive: req.params.userId,
          },
        },
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.post(
  '/:companyId/add-staff',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await isCompanyAdmin(req, false));
    const payload = validateDTO(RegisterDto, {
      ...req.body,
      companyId: req.params.companyId,
    });

    const user = throwIfError(
      await AuthService.registerStaff({
        ...payload,
      }),
    );
    // throwIfError(
    //   await CompanyService.updateOne(
    //     {
    //       _id: req.params.companyId,
    //       ...perm.query,
    //     },
    //     {},
    //     {
    //       $addToSet: {
    //         staffs: user.data._id,
    //       },
    //     },
    //   ),
    // );
    return response(res, 200, user.message, user.data);
  },
);
export default router;
