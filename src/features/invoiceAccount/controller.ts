import express, { Request, Response } from 'express';
import {
  canCreateInvoiceAccount,
  canDeleteInvoiceAccount,
  canFetchInvoiceAccount,
  canUpdateInvoiceAccount,
} from './guard';
import InvoiceAccountService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';

const router = express.Router();
const InvoiceAccountPathName = '/InvoiceAccount';

router.post('/', async (req: Request, res: Response) => {
  console.log(req.headers, 'req.headers', req.body, 'req.body');
  const perm = throwPermIfError(await canCreateInvoiceAccount(req, true));
  const content = throwIfError(
    await InvoiceAccountService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  console.log(req.query, 'req.query');
  const perm = throwPermIfError(await canFetchInvoiceAccount(req, false));
  const content = throwIfError(
    await InvoiceAccountService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceAccount(req, false));
  const content = throwIfError(
    await InvoiceAccountService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateInvoiceAccount(req, false));
  const content = throwIfError(
    await InvoiceAccountService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceAccount(req, false));
  const content = throwIfError(
    await InvoiceAccountService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
