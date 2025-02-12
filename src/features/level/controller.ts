import express, { Request, Response } from 'express';
import {
  canCreateLevel,
  canDeleteLevel,
  canFetchLevel,
  canUpdateLevel,
} from './guard';
import LevelService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyAdmin } from '../company/guard';
const router = express.Router();
router.post(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canCreateLevel(req));
    const content = throwIfError(
      await LevelService.create(req.body, {
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
    // throwPermIfError(await canFetchLevel(req));
    const content = throwIfError(
      await LevelService.fetch(req.query, {
        // createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

// router.get('/:id', async (req: Request, res: Response) => {
//   throwIfError(await canFetchLevel(req));
//   const content = throwIfError(
//     await LevelService.fetchOne(req.query, {
//       _id: req.params.id,
//       createdBy: req.user._id,
//     }),
//   );
//   return response(res, content.statusCode, content.message, content.data);
// });

router.put(
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
      await LevelService.updateOne(
        { _id: req.params.id, company: req.params.companyId as any },
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
      await LevelService.deleteOne(req.params.id, {
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
