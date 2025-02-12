import express, { Request, Response } from 'express';
import { canCreateMedias, canDeleteMedias, canFetchMedias, canUpdateMedias } from './guard';
import MediasService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const MediasPathName = '/Medias';

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateMedias(req, true));
  const content = throwIfError(
    await MediasService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMedias(req, false));
  const content = throwIfError(
    await MediasService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMedias(req, false));
  const content = throwIfError(
    await MediasService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateMedias(req, false));
  const content = throwIfError(
    await MediasService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteMedias(req, false));
  const content = throwIfError(
    await MediasService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
