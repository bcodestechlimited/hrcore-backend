import express, { Request, Response } from 'express';
import {
  canApproveVoucher,
  canCreateVoucher,
  canDeleteVoucher,
  canEndorseVoucher,
  canFetchVoucher,
  canUpdateVoucher,
} from './guard';
import VoucherService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateVoucherDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateVoucher(req, true));
  const content = throwIfError(
    await VoucherService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucher(req, false));
  const content = throwIfError(
    await VoucherService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchVoucher(req, false));
  const content = throwIfError(
    await VoucherService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateVoucherDto, req.body);

  const perm = throwPermIfError(await canUpdateVoucher(req, false));
  const content = throwIfError(
    await VoucherService.updateOne(
      { _id: req.params.id, ...perm.query },
      {
        ...body,
        updatedBy: req.user._id,
      },
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id/approve', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canApproveVoucher(req, false));
  let content = await VoucherService.updateOne(
    { _id: req.params.id, ...perm.query, endorsed: true },
    {
      updatedBy: req.user._id,
    },
    {
      approved: true,
      approvedBy: req.user?._id,
    },
  );

  if (!content.success) {
    return response(
      res,
      content.statusCode || 400,
      `Voucher must be endorsed before it can be approved`,
      content.data,
    );
  }

  return response(
    res,
    content.statusCode || 200,
    content.message,
    content.data,
  );
});

router.put('/:id/endorse', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canEndorseVoucher(req, false));
  const content = throwIfError(
    await VoucherService.updateOne(
      { _id: req.params.id, ...perm.query },
      {
        updatedBy: req.user._id,
      },
      {
        endorsed: true,
        endorsedBy: req.user?._id,
      },
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/endorse/all', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canEndorseVoucher(req, false));

  await VoucherService._Model.updateMany(
    { ...perm.query },
    {
      updatedBy: req.user._id,
      endorsed: true,
      endorsedBy: req.user?._id,
    },
  );

  return response(res, 200, 'Vouchers endorsed successfully', null);
});

router.put('/approve/all', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canApproveVoucher(req, false));
  await VoucherService._Model.updateMany(
    { ...perm.query, endorsed: true },
    {
      updatedBy: req.user._id,
      approved: true,
      approvedBy: req.user?._id,
    },
  );

  return response(res, 200, 'Vouchers approved successfully', null);
});
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteVoucher(req, false));
  const content = throwIfError(
    await VoucherService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
