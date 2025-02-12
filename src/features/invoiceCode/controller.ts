import express, { Request, Response } from 'express';
import {
  canCreateInvoiceCode,
  canDeleteInvoiceCode,
  canFetchInvoiceCode,
  canUpdateInvoiceCode,
} from './guard';
import InvoiceCodeService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateInvoiceCodeDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoiceCode(req, true));
  const content = throwIfError(
    await InvoiceCodeService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceCode(req, false));
  const content = throwIfError(
    await InvoiceCodeService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceCode(req, false));
  const content = throwIfError(
    await InvoiceCodeService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateInvoiceCodeDto, req.body);

  const perm = throwPermIfError(await canUpdateInvoiceCode(req, false));
  const content = throwIfError(
    await InvoiceCodeService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceCode(req, false));
  const content = throwIfError(
    await InvoiceCodeService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
