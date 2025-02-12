import express, { Request, Response } from 'express';
import {
  canCreatePerformanceReview,
  canDeletePerformanceReview,
  canFetchPerformanceReview,
  canUpdatePerformanceReview,
} from './guard';
import PerformanceReviewService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { CreatePerformanceReviewDto, UpdatePerformanceReviewDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreatePerformanceReview(req, true));
  const body = validateDTO(CreatePerformanceReviewDto, req.body);

  const content = throwIfError(
    await PerformanceReviewService.create(req.user._id, body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchPerformanceReview(req, false));
  const content = throwIfError(
    await PerformanceReviewService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchPerformanceReview(req, false));
  const content = throwIfError(
    await PerformanceReviewService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

// TODO: For security purpose. Seperate the endpoints for staff and line manager review
router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdatePerformanceReviewDto, req.body);

  const perm = throwPermIfError(await canUpdatePerformanceReview(req, false));
  const content = throwIfError(
    await PerformanceReviewService.updateOne(
      req.user._id,
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );

  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeletePerformanceReview(req, false));
  const content = throwIfError(
    await PerformanceReviewService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
