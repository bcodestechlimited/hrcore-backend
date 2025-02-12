import express, { Request, Response } from 'express';
import { canCreateInvoiceTag, canDeleteInvoiceTag, canFetchInvoiceTag, canUpdateInvoiceTag } from './guard';
import InvoiceTagService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const InvoiceTagPathName = '/InvoiceTag';
/**
 * @openapi
 * 
 * /InvoiceTag:
 *   post:
 *     summary: Create a new InvoiceTag
 *     tags:
 *       - InvoiceTags
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: InvoiceTag created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoiceTag(req, true));
  const content = throwIfError(
    await InvoiceTagService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all InvoiceTags
 *
 * @openapi
 *
 * /InvoiceTag:
 *   get:
 *     summary: Fetch all InvoiceTags
 *     tags:
 *       - InvoiceTags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: InvoiceTags fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceTag(req, false));
  const content = throwIfError(
    await InvoiceTagService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single InvoiceTag by ID
 *
 * @openapi
 *
 * /InvoiceTag/{id}:
 *   get:
 *     summary: Fetch a single InvoiceTag by ID
 *     tags:
 *       - InvoiceTags
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
 *         description: InvoiceTag fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceTag(req, false));
  const content = throwIfError(
    await InvoiceTagService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single InvoiceTag by ID
 * 
 * @openapi
 * 
 * /InvoiceTag/{id}:
 *   put:
 *     summary: Update a single InvoiceTag by ID
 *     tags:
 *       - InvoiceTags
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
 *         description: InvoiceTag updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateInvoiceTag(req, false));
  const content = throwIfError(
    await InvoiceTagService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single InvoiceTag by ID
 * 
 * @openapi
 * 
 * /InvoiceTag/{id}:
 *   delete:
 *     summary: Delete a single InvoiceTag by ID
 *     tags:
 *       - InvoiceTags
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
 *         description: InvoiceTag deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceTag(req, false));
  const content = throwIfError(
    await InvoiceTagService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
