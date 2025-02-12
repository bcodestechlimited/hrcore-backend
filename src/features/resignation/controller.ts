import express, { Request, Response } from 'express';
import {
  canCreateResignation,
  canDeleteResignation,
  canFetchResignation,
  canUpdateResignation,
} from './guard';
import ResignationService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const ResignationPathName = '/Resignation';
/**
 * @openapi
 * 
 * /Resignation:
 *   post:
 *     summary: Create a new Resignation
 *     tags:
 *       - Resignations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Resignation created successfully
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
    const perm = throwPermIfError(await canCreateResignation(req, true));
    const content = throwIfError(
      await ResignationService.create(req.body, {
        createdBy: req.user._id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all Resignations
 *
 * @openapi
 *
 * /Resignation:
 *   get:
 *     summary: Fetch all Resignations
 *     tags:
 *       - Resignations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resignations fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchResignation(req, false));
    const content = throwIfError(
      await ResignationService.fetch(req.query, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single Resignation by ID
 *
 * @openapi
 *
 * /Resignation/{id}:
 *   get:
 *     summary: Fetch a single Resignation by ID
 *     tags:
 *       - Resignations
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
 *         description: Resignation fetched successfully
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
    const perm = throwPermIfError(await canFetchResignation(req, false));
    const content = throwIfError(
      await ResignationService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Updates a single Resignation by ID
 * 
 * @openapi
 * 
 * /Resignation/{id}:
 *   put:
 *     summary: Update a single Resignation by ID
 *     tags:
 *       - Resignations
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
 *         description: Resignation updated successfully
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
    const perm = throwPermIfError(await canUpdateResignation(req, false));
    const content = throwIfError(
      await ResignationService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single Resignation by ID
 * 
 * @openapi
 * 
 * /Resignation/{id}:
 *   delete:
 *     summary: Delete a single Resignation by ID
 *     tags:
 *       - Resignations
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
 *         description: Resignation deleted successfully
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
    const perm = throwPermIfError(await canDeleteResignation(req, false));
    const content = throwIfError(
      await ResignationService.deleteOne(req.params.id, {
        createdBy: req.user._id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
