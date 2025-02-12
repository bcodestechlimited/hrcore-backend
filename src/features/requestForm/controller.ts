import express, { Request, Response } from 'express';
import {
  canCreateRequestForm,
  canDeleteRequestForm,
  canFetchRequestForm,
  canUpdateRequestForm,
} from './guard';
import RequestFormService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const RequestFormPathName = '/RequestForm';
/**
 * @openapi
 * 
 * /RequestForm:
 *   post:
 *     summary: Create a new RequestForm
 *     tags:
 *       - RequestForms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: RequestForm created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateRequestForm(req, true));
  const content = throwIfError(
    await RequestFormService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all RequestForms
 *
 * @openapi
 *
 * /RequestForm:
 *   get:
 *     summary: Fetch all RequestForms
 *     tags:
 *       - RequestForms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: RequestForms fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchRequestForm(req, false));
  const content = throwIfError(
    await RequestFormService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single RequestForm by ID
 *
 * @openapi
 *
 * /RequestForm/{id}:
 *   get:
 *     summary: Fetch a single RequestForm by ID
 *     tags:
 *       - RequestForms
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
 *         description: RequestForm fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchRequestForm(req, false));
  const content = throwIfError(
    await RequestFormService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single RequestForm by ID
 * 
 * @openapi
 * 
 * /RequestForm/{id}:
 *   put:
 *     summary: Update a single RequestForm by ID
 *     tags:
 *       - RequestForms
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
 *         description: RequestForm updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateRequestForm(req, false));
  const content = throwIfError(
    await RequestFormService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single RequestForm by ID
 * 
 * @openapi
 * 
 * /RequestForm/{id}:
 *   delete:
 *     summary: Delete a single RequestForm by ID
 *     tags:
 *       - RequestForms
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
 *         description: RequestForm deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteRequestForm(req, false));
  const content = throwIfError(
    await RequestFormService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
