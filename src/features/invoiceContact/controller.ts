import express, { Request, Response } from 'express';
import {
  canCreateInvoiceContact,
  canDeleteInvoiceContact,
  canFetchInvoiceContact,
  canUpdateInvoiceContact,
} from './guard';
import InvoiceContactService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const InvoiceContactPathName = '/InvoiceContact';
/**
 * @openapi
 * 
 * /InvoiceContact:
 *   post:
 *     summary: Create a new InvoiceContact
 *     tags:
 *       - InvoiceContacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: InvoiceContact created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateInvoiceContact(req, true));
  const content = throwIfError(
    await InvoiceContactService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all InvoiceContacts
 *
 * @openapi
 *
 * /InvoiceContact:
 *   get:
 *     summary: Fetch all InvoiceContacts
 *     tags:
 *       - InvoiceContacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: InvoiceContacts fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceContact(req, false));
  const content = throwIfError(
    await InvoiceContactService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single InvoiceContact by ID
 *
 * @openapi
 *
 * /InvoiceContact/{id}:
 *   get:
 *     summary: Fetch a single InvoiceContact by ID
 *     tags:
 *       - InvoiceContacts
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
 *         description: InvoiceContact fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchInvoiceContact(req, false));
  const content = throwIfError(
    await InvoiceContactService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single InvoiceContact by ID
 * 
 * @openapi
 * 
 * /InvoiceContact/{id}:
 *   put:
 *     summary: Update a single InvoiceContact by ID
 *     tags:
 *       - InvoiceContacts
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
 *         description: InvoiceContact updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateInvoiceContact(req, false));
  const content = throwIfError(
    await InvoiceContactService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single InvoiceContact by ID
 * 
 * @openapi
 * 
 * /InvoiceContact/{id}:
 *   delete:
 *     summary: Delete a single InvoiceContact by ID
 *     tags:
 *       - InvoiceContacts
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
 *         description: InvoiceContact deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteInvoiceContact(req, false));
  const content = throwIfError(
    await InvoiceContactService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
