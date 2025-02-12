import express, { Request, Response } from 'express';
import {
  canCreateApprovalFlow,
  canDeleteApprovalFlow,
  canFetchApprovalFlow,
  canUpdateApprovalFlow,
} from './guard';
import ApprovalFlowService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyAdmin } from '../company/guard';
const router = express.Router();
const ApprovalFlowPathName = '/ApprovalFlow';
/**
 * @openapi
 * 
 * /ApprovalFlow:
 *   post:
 *     summary: Create a new ApprovalFlow
 *     tags:
 *       - ApprovalFlows
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: ApprovalFlow created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateApprovalFlow(req, true));
  const content = throwIfError(
    await ApprovalFlowService.create(req.body, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.post(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await ApprovalFlowService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all ApprovalFlows
 *
 * @openapi
 *
 * /ApprovalFlow:
 *   get:
 *     summary: Fetch all ApprovalFlows
 *     tags:
 *       - ApprovalFlows
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ApprovalFlows fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchApprovalFlow(req, false));
  const content = throwIfError(
    await ApprovalFlowService.fetch(req.query, {
      createdBy: req.user._id,
      ...perm.query,
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
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    const content = throwIfError(
      await ApprovalFlowService.fetch(req.query, {
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
/**
 * Fetches a single ApprovalFlow by ID
 *
 * @openapi
 *
 * /ApprovalFlow/{id}:
 *   get:
 *     summary: Fetch a single ApprovalFlow by ID
 *     tags:
 *       - ApprovalFlows
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
 *         description: ApprovalFlow fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchApprovalFlow(req, false));
  const content = throwIfError(
    await ApprovalFlowService.fetchOne(req.query, {
      _id: req.params.id,
      // createdBy: req.user._id,
      // ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single ApprovalFlow by ID
 * 
 * @openapi
 * 
 * /ApprovalFlow/{id}:
 *   put:
 *     summary: Update a single ApprovalFlow by ID
 *     tags:
 *       - ApprovalFlows
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
 *         description: ApprovalFlow updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateApprovalFlow(req, false));
  const content = throwIfError(
    await ApprovalFlowService.updateOne(
      { _id: req.params.id, ...perm.query },
      req.body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    const content = throwIfError(
      await ApprovalFlowService.updateOne(
        { _id: req.params.id, company: req.params.companyId },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single ApprovalFlow by ID
 * 
 * @openapi
 * 
 * /ApprovalFlow/{id}:
 *   delete:
 *     summary: Delete a single ApprovalFlow by ID
 *     tags:
 *       - ApprovalFlows
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
 *         description: ApprovalFlow deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteApprovalFlow(req, false));
  const content = throwIfError(
    await ApprovalFlowService.deleteOne(req.params.id, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyAdmin(req, false));
    const content = throwIfError(
      await ApprovalFlowService.deleteOne(req.params.id, {
        // createdBy: req.user._id,
        // ...perm.query,
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
