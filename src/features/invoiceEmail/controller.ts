import express, { Request, Response } from 'express';
import {
  canCreateInvoiceEmail,
  canDeleteInvoiceEmail,
  canFetchInvoiceEmail,
  canUpdateInvoiceEmail,
} from './guard';
import InvoiceEmailService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateInvoiceEmailDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoiceEmail(req, true));
  const content = throwIfError(
    await InvoiceEmailService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceEmail(req, false));
  const content = throwIfError(
    await InvoiceEmailService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceEmail(req, false));
  const content = throwIfError(
    await InvoiceEmailService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateInvoiceEmailDto, req.body);

  const perm = throwPermIfError(await canUpdateInvoiceEmail(req, false));
  const content = throwIfError(
    await InvoiceEmailService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceEmail(req, false));
  const content = throwIfError(
    await InvoiceEmailService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
