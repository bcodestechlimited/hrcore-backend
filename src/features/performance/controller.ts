import express, { Request, Response } from 'express';
import {
  canCreatePerformance,
  canDeletePerformance,
  canFetchPerformance,
  canUpdatePerformance,
} from './guard';
import PerformanceService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdatePerformanceDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreatePerformance(req, true));
  const content = throwIfError(
    await PerformanceService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchPerformance(req, false));
  const content = throwIfError(
    await PerformanceService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchPerformance(req, false));
  const content = throwIfError(
    await PerformanceService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdatePerformanceDto, req.body);

  const perm = throwPermIfError(await canUpdatePerformance(req, false));
  const content = throwIfError(
    await PerformanceService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeletePerformance(req, false));
  const content = throwIfError(
    await PerformanceService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
