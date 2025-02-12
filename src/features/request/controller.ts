import express, { Request, Response } from 'express';
import {
  canCreateRequest,
  canDeleteRequest,
  canFetchRequest,
  canUpdateRequest,
} from './guard';
import RequestService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const RequestPathName = '/Request';
/**
 * @openapi
 * 
 * /Request:
 *   post:
 *     summary: Create a new Request
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Request created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateRequest(req, true));
  const content = throwIfError(
    await RequestService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all Requests
 *
 * @openapi
 *
 * /Request:
 *   get:
 *     summary: Fetch all Requests
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Requests fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchRequest(req, false));
  const content = throwIfError(
    await RequestService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single Request by ID
 *
 * @openapi
 *
 * /Request/{id}:
 *   get:
 *     summary: Fetch a single Request by ID
 *     tags:
 *       - Requests
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
 *         description: Request fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchRequest(req, false));
  const content = throwIfError(
    await RequestService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single Request by ID
 * 
 * @openapi
 * 
 * /Request/{id}:
 *   put:
 *     summary: Update a single Request by ID
 *     tags:
 *       - Requests
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
 *         description: Request updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateRequest(req, false));
  const content = throwIfError(
    await RequestService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single Request by ID
 * 
 * @openapi
 * 
 * /Request/{id}:
 *   delete:
 *     summary: Delete a single Request by ID
 *     tags:
 *       - Requests
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
 *         description: Request deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteRequest(req, false));
  const content = throwIfError(
    await RequestService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
