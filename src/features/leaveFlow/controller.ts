import express, { Request, Response } from 'express';
import {
  canCreateLeaveFlow,
  canDeleteLeaveFlow,
  canFetchLeaveFlow,
  canUpdateLeaveFlow,
} from './guard';
import LeaveFlowService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const LeaveFlowPathName = '/LeaveFlow';
/**
 * @openapi
 * 
 * /LeaveFlow:
 *   post:
 *     summary: Create a new LeaveFlow
 *     tags:
 *       - LeaveFlows
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: LeaveFlow created successfully
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
    throwPermIfError(await canCreateLeaveFlow(req));
    const content = throwIfError(
      await LeaveFlowService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all LeaveFlows
 *
 * @openapi
 *
 * /LeaveFlow:
 *   get:
 *     summary: Fetch all LeaveFlows
 *     tags:
 *       - LeaveFlows
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: LeaveFlows fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canFetchLeaveFlow(req, true));
    const content = throwIfError(
      await LeaveFlowService.fetch(req.query, {
        // createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single LeaveFlow by ID
 *
 * @openapi
 *
 * /LeaveFlow/{id}:
 *   get:
 *     summary: Fetch a single LeaveFlow by ID
 *     tags:
 *       - LeaveFlows
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
 *         description: LeaveFlow fetched successfully
 */
// router.get('/:companyId/:id', async (req: Request, res: Response) => {
//   throwPermIfError(await canFetchLeaveFlow(req, true));
//   const content = throwIfError(
//     await LeaveFlowService.fetchOne(req.query, {
//       _id: req.params.id,
//       createdBy: req.user._id,
//     }),
//   );
//   return response(res, content.statusCode, content.message, content.data);
// });

/**
 * Updates a single LeaveFlow by ID
 * 
 * @openapi
 * 
 * /LeaveFlow/{id}:
 *   put:
 *     summary: Update a single LeaveFlow by ID
 *     tags:
 *       - LeaveFlows
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
 *         description: LeaveFlow updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canUpdateLeaveFlow(req));
  const content = throwIfError(
    await LeaveFlowService.updateOne({ _id: req.params.id }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single LeaveFlow by ID
 * 
 * @openapi
 * 
 * /LeaveFlow/{id}:
 *   delete:
 *     summary: Delete a single LeaveFlow by ID
 *     tags:
 *       - LeaveFlows
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
 *         description: LeaveFlow deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canDeleteLeaveFlow(req));
  const content = throwIfError(
    await LeaveFlowService.deleteOne(req.params.id, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
