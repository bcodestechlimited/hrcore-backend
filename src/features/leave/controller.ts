import express, { Request, Response } from 'express';
import {
  canCreateLeave,
  canDeleteLeave,
  canFetchLeave,
  canUpdateLeave,
} from './guard';
import LeaveService from './service';
import response, { throwIfError, throwPermIfError } from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const LeavePathName = '/Leave';
/**
 * @openapi
 * 
 * /Leave:
 *   post:
 *     summary: Create a new Leave
 *     tags:
 *       - Leaves
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Leave created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateLeave(req));
  const content = throwIfError(
    await LeaveService.create(req.body, { createdBy: req.user._id }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all Leaves
 *
 * @openapi
 *
 * /Leave:
 *   get:
 *     summary: Fetch all Leaves
 *     tags:
 *       - Leaves
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leaves fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  throwPermIfError(await canFetchLeave(req));
  const content = throwIfError(
    await LeaveService.fetch(req.query, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single Leave by ID
 *
 * @openapi
 *
 * /Leave/{id}:
 *   get:
 *     summary: Fetch a single Leave by ID
 *     tags:
 *       - Leaves
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
 *         description: Leave fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canFetchLeave(req));
  const content = throwIfError(
    await LeaveService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single Leave by ID
 * 
 * @openapi
 * 
 * /Leave/{id}:
 *   put:
 *     summary: Update a single Leave by ID
 *     tags:
 *       - Leaves
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
 *         description: Leave updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canUpdateLeave(req));
  const content = throwIfError(
    await LeaveService.updateOne({ _id: req.params.id }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single Leave by ID
 * 
 * @openapi
 * 
 * /Leave/{id}:
 *   delete:
 *     summary: Delete a single Leave by ID
 *     tags:
 *       - Leaves
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
 *         description: Leave deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canDeleteLeave(req));
  const content = throwIfError(
    await LeaveService.deleteOne(req.params.id, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
