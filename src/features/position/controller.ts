import express, { Request, Response } from 'express';
import {
  canCreatePosition,
  canDeletePosition,
  canFetchPosition,
  canUpdatePosition,
} from './guard';
import PositionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { checkUserTypesService } from '../../middlewares/authentication';
const router = express.Router();
router.post(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canCreatePosition(req, true));
    const content = throwIfError(
      await PositionService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get('/', async (req: Request, res: Response) => {
  await checkUserTypesService(req, ['super', 'admin']);
  const content = throwIfError(
    await PositionService.fetch(req.query, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    // const perm = throwPermIfError(await canFetchPosition(req, false));
    const content = throwIfError(
      await PositionService.fetch(req.query, {
        // ...perm.query,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchPosition(req, false));
    const content = throwIfError(
      await PositionService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
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
    const perm = throwPermIfError(await canUpdatePosition(req, true));
    const content = throwIfError(
      await PositionService.updateOne(
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
    const perm = throwPermIfError(await canDeletePosition(req, true));
    const content = throwIfError(
      await PositionService.deleteOne(req.params.id, {
        // createdBy: req.user._id,
        company: perm.query.company,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
