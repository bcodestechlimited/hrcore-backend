import express, { Request, Response } from 'express';
import { canCreateInvoiceItem, canDeleteInvoiceItem, canFetchInvoiceItem, canUpdateInvoiceItem } from './guard';
import InvoiceItemService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const InvoiceItemPathName = '/InvoiceItem';
/**
 * @openapi
 * 
 * /InvoiceItem:
 *   post:
 *     summary: Create a new InvoiceItem
 *     tags:
 *       - InvoiceItems
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: InvoiceItem created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoiceItem(req, true));
  const content = throwIfError(
    await InvoiceItemService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all InvoiceItems
 *
 * @openapi
 *
 * /InvoiceItem:
 *   get:
 *     summary: Fetch all InvoiceItems
 *     tags:
 *       - InvoiceItems
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: InvoiceItems fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceItem(req, false));
  const content = throwIfError(
    await InvoiceItemService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single InvoiceItem by ID
 *
 * @openapi
 *
 * /InvoiceItem/{id}:
 *   get:
 *     summary: Fetch a single InvoiceItem by ID
 *     tags:
 *       - InvoiceItems
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
 *         description: InvoiceItem fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceItem(req, false));
  const content = throwIfError(
    await InvoiceItemService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single InvoiceItem by ID
 * 
 * @openapi
 * 
 * /InvoiceItem/{id}:
 *   put:
 *     summary: Update a single InvoiceItem by ID
 *     tags:
 *       - InvoiceItems
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
 *         description: InvoiceItem updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateInvoiceItem(req, false));
  const content = throwIfError(
    await InvoiceItemService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single InvoiceItem by ID
 * 
 * @openapi
 * 
 * /InvoiceItem/{id}:
 *   delete:
 *     summary: Delete a single InvoiceItem by ID
 *     tags:
 *       - InvoiceItems
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
 *         description: InvoiceItem deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceItem(req, false));
  const content = throwIfError(
    await InvoiceItemService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
