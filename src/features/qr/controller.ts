import express, { Request, Response } from 'express';
import { canCreateQr, canDeleteQr, canFetchQr, canUpdateQr } from './guard';
import QrService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { checkUserTypesService } from '../../middlewares/authentication';
import { Types } from 'mongoose';
import { isCompanyStaff } from '../company/guard';
const router = express.Router();
const QrPathName = '/Qr';
/**
 * @openapi
 * 
 * /Qr:
 *   post:
 *     summary: Create a new Qr
 *     tags:
 *       - Qrs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Qr created successfully
//  *         content:
//  *           application/json:
 */
router.post(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canCreateQr(req, true));
    const content = throwIfError(
      await QrService.create(req.body, {
        // createdBy: req.user._id
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.post(
  '/:companyId/scan',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyStaff(req, true));
    const content = throwIfError(
      await QrService.scanQrCode(req.body.code, req.user._id as any),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
/**
 * Fetches all Qrs
 *
 * @openapi
 *
 * /Qr:
 *   get:
 *     summary: Fetch all Qrs
 *     tags:
 *       - Qrs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Qrs fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  // const perm = throwPermIfError(await canFetchQr(req, false));
  await checkUserTypesService(req, ['super']);
  const content = throwIfError(
    await QrService.fetch(req.query, {
      createdBy: req.user._id,
      // ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchQr(req, false));
    const content = throwIfError(
      await QrService.fetch(req.query, {
        createdBy: req.user._id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single Qr by ID
 *
 * @openapi
 *
 * /Qr/{id}:
 *   get:
 *     summary: Fetch a single Qr by ID
 *     tags:
 *       - Qrs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qr fetched successfully
 */
// router.get('/:id', async (req: Request, res: Response) => {
//   const perm = throwPermIfError(await canFetchQr(req, false));
//   const content = throwIfError(
//     await QrService.fetchOne(req.query, {
//       _id: req.params.id,
//       createdBy: req.user._id,
//       ...perm.query,
//     }),
//   );
//   return response(res, content.statusCode, content.message, content.data);
// });

/**
 * Updates a single Qr by ID
 * 
 * @openapi
 * 
 * /Qr/{id}:
 *   put:
 *     summary: Update a single Qr by ID
 *     tags:
 *       - Qrs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       200:
 *         description: Qr updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateQr(req, false));
  const content = throwIfError(
    await QrService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single Qr by ID
 * 
 * @openapi
 * 
 * /Qr/{id}:
 *   delete:
 *     summary: Delete a single Qr by ID
 *     tags:
 *       - Qrs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qr deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQr(req, false));
  const content = throwIfError(
    await QrService.deleteOne(req.params.id, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
