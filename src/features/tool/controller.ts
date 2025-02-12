import express, { Request, Response } from 'express';
import {
  canCreateTool,
  canDeleteTool,
  canFetchTool,
  canUpdateTool,
} from './guard';
import ToolService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const ToolPathName = '/Tool';
/**
 * @openapi
 * 
 * /Tool:
 *   post:
 *     summary: Create a new Tool
 *     tags:
 *       - Tools
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Tool created successfully
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
    const perm = throwPermIfError(await canCreateTool(req, true));
    const content = throwIfError(
      await ToolService.create(req.body, {
        ...perm.query,
        createdBy: req.user?._id,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all Tools
 *
 * @openapi
 *
 * /Tool:
 *   get:
 *     summary: Fetch all Tools
 *     tags:
 *       - Tools
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tools fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchTool(req, false));
    const content = throwIfError(
      await ToolService.fetch(req.query, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single Tool by ID
 *
 * @openapi
 *
 * /Tool/{id}:
 *   get:
 *     summary: Fetch a single Tool by ID
 *     tags:
 *       - Tools
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
 *         description: Tool fetched successfully
 */
router.get(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchTool(req, false));
    const content = throwIfError(
      await ToolService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Updates a single Tool by ID
 * 
 * @openapi
 * 
 * /Tool/{id}:
 *   put:
 *     summary: Update a single Tool by ID
 *     tags:
 *       - Tools
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
 *         description: Tool updated successfully
 */
router.put(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canUpdateTool(req, false));
    const content = throwIfError(
      await ToolService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single Tool by ID
 * 
 * @openapi
 * 
 * /Tool/{id}:
 *   delete:
 *     summary: Delete a single Tool by ID
 *     tags:
 *       - Tools
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
 *         description: Tool deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canDeleteTool(req, false));
    const content = throwIfError(
      await ToolService.deleteOne(req.params.id, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

// assign tools to user
//unassign tools from user

export default router;
