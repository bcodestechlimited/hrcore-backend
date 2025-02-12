import express, { Request, Response } from 'express';
import {
  canCreateInvoice,
  canDeleteInvoice,
  canFetchInvoice,
  canUpdateInvoice,
} from './guard';
import InvoiceService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoice(req, true));
  const content = throwIfError(
    await InvoiceService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoice(req, false));
  const content = throwIfError(
    await InvoiceService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoice(req, false));
  const content = throwIfError(
    await InvoiceService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateInvoice(req, false));
  const content = throwIfError(
    await InvoiceService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoice(req, false));
  const content = throwIfError(
    await InvoiceService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
