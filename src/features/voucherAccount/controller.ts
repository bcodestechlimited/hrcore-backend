import express, { Request, Response } from 'express';
import { canCreateVoucherAccount, canDeleteVoucherAccount, canFetchVoucherAccount, canUpdateVoucherAccount } from './guard';
import VoucherAccountService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateVoucherAccountDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateVoucherAccount(req, true));
  const content = throwIfError(
    await VoucherAccountService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucherAccount(req, false));
  const content = throwIfError(
    await VoucherAccountService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucherAccount(req, false));
  const content = throwIfError(
    await VoucherAccountService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateVoucherAccountDto, req.body);

  const perm = throwPermIfError(await canUpdateVoucherAccount(req, false));
  const content = throwIfError(
    await VoucherAccountService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteVoucherAccount(req, false));
  const content = throwIfError(
    await VoucherAccountService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
