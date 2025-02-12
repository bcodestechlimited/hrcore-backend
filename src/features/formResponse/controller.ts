import express, { Request, Response } from 'express';
import { canCreateFormResponse, canDeleteFormResponse, canFetchFormResponse, canUpdateFormResponse } from './guard';
import FormResponseService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const FormResponsePathName = '/FormResponse';
/**
 * @openapi
 * 
 * /FormResponse:
 *   post:
 *     summary: Create a new FormResponse
 *     tags:
 *       - FormResponses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: FormResponse created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateFormResponse(req, true));
  const content = throwIfError(
    await FormResponseService.create(req.body, { createdBy: req.user._id }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all FormResponses
 *
 * @openapi
 *
 * /FormResponse:
 *   get:
 *     summary: Fetch all FormResponses
 *     tags:
 *       - FormResponses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: FormResponses fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFormResponse(req, false));
  const content = throwIfError(
    await FormResponseService.fetch(req.query, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single FormResponse by ID
 *
 * @openapi
 *
 * /FormResponse/{id}:
 *   get:
 *     summary: Fetch a single FormResponse by ID
 *     tags:
 *       - FormResponses
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
 *         description: FormResponse fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFormResponse(req, false));
  const content = throwIfError(
    await FormResponseService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single FormResponse by ID
 * 
 * @openapi
 * 
 * /FormResponse/{id}:
 *   put:
 *     summary: Update a single FormResponse by ID
 *     tags:
 *       - FormResponses
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
 *         description: FormResponse updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateFormResponse(req, false));
  const content = throwIfError(
    await FormResponseService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single FormResponse by ID
 * 
 * @openapi
 * 
 * /FormResponse/{id}:
 *   delete:
 *     summary: Delete a single FormResponse by ID
 *     tags:
 *       - FormResponses
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
 *         description: FormResponse deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteFormResponse(req, false));
  const content = throwIfError(
    await FormResponseService.deleteOne(req.params.id, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
