import express, { Request, Response } from 'express';
import { canCreateVoucherCompanies, canDeleteVoucherCompanies, canFetchVoucherCompanies, canUpdateVoucherCompanies } from './guard';
import VoucherCompaniesService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateVoucherCompaniesDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateVoucherCompanies(req, true));
  const content = throwIfError(
    await VoucherCompaniesService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucherCompanies(req, false));
  const content = throwIfError(
    await VoucherCompaniesService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucherCompanies(req, false));
  const content = throwIfError(
    await VoucherCompaniesService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateVoucherCompaniesDto, req.body);

  const perm = throwPermIfError(await canUpdateVoucherCompanies(req, false));
  const content = throwIfError(
    await VoucherCompaniesService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteVoucherCompanies(req, false));
  const content = throwIfError(
    await VoucherCompaniesService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
