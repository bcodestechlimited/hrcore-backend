import express, { Request, Response } from 'express';
import {
  canCreateFlow,
  canDeleteFlow,
  canFetchFlow,
  canUpdateFlow,
} from './guard';
import FlowService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyAdmin } from '../company/guard';
const router = express.Router();
const FlowPathName = '/Flow';
/**
 * @openapi
 * 
 * /Flow:
 *   post:
 *     summary: Create a new Flow
 *     tags:
 *       - Flows
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Flow created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateFlow(req, true));
  const content = throwIfError(
    await FlowService.create(req.body, { createdBy: req.user._id }),
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
      await FlowService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all Flows
 *
 * @openapi
 *
 * /Flow:
 *   get:
 *     summary: Fetch all Flows
 *     tags:
 *       - Flows
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flows fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFlow(req, false));
  const content = throwIfError(
    await FlowService.fetch(req.query, {
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
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await FlowService.fetch(req.query, {
        company: req.params.companyId,
        // createdBy: req.user._id,
        // ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
/**
 * Fetches a single Flow by ID
 *
 * @openapi
 *
 * /Flow/{id}:
 *   get:
 *     summary: Fetch a single Flow by ID
 *     tags:
 *       - Flows
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
 *         description: Flow fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFlow(req, false));
  const content = throwIfError(
    await FlowService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single Flow by ID
 * 
 * @openapi
 * 
 * /Flow/{id}:
 *   put:
 *     summary: Update a single Flow by ID
 *     tags:
 *       - Flows
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
 *         description: Flow updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateFlow(req, false));
  const content = throwIfError(
    await FlowService.updateOne(
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
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await FlowService.updateOne(
        { _id: req.params.id, company: req.params.companyId },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single Flow by ID
 * 
 * @openapi
 * 
 * /Flow/{id}:
 *   delete:
 *     summary: Delete a single Flow by ID
 *     tags:
 *       - Flows
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
 *         description: Flow deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteFlow(req, false));
  const content = throwIfError(
    await FlowService.deleteOne(req.params.id, {
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
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await FlowService.deleteOne(req.params.id, {
        // createdBy: req.user._id,
        // ...perm.query,
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
export default router;
