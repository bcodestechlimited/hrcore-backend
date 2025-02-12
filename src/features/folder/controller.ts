import express, { Request, Response } from 'express';
import {
  canCreateFolder,
  canDeleteFolder,
  canFetchFolder,
  canUpdateFolder,
} from './guard';
import FolderService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const FolderPathName = '/Folder';
/**
 * @openapi
 * 
 * /Folder:
 *   post:
 *     summary: Create a new Folder
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Folder created successfully
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
    throwPermIfError(await canCreateFolder(req, true));
    const content = throwIfError(
      await FolderService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all Folders
 *
 * @openapi
 *
 * /Folder:
 *   get:
 *     summary: Fetch all Folders
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Folders fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchFolder(req, false));
    const content = throwIfError(
      await FolderService.fetch(req.query, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single Folder by ID
 *
 * @openapi
 *
 * /Folder/{id}:
 *   get:
 *     summary: Fetch a single Folder by ID
 *     tags:
 *       - Folders
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
 *         description: Folder fetched successfully
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
    const perm = throwPermIfError(await canFetchFolder(req, false));
    const content = throwIfError(
      await FolderService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Updates a single Folder by ID
 * 
 * @openapi
 * 
 * /Folder/{id}:
 *   put:
 *     summary: Update a single Folder by ID
 *     tags:
 *       - Folders
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
 *         description: Folder updated successfully
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
    const perm = throwPermIfError(await canUpdateFolder(req, false));
    const content = throwIfError(
      await FolderService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single Folder by ID
 * 
 * @openapi
 * 
 * /Folder/{id}:
 *   delete:
 *     summary: Delete a single Folder by ID
 *     tags:
 *       - Folders
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
 *         description: Folder deleted successfully
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
    const perm = throwPermIfError(await canDeleteFolder(req, false));
    const content = throwIfError(
      await FolderService.deleteOne(req.params.id, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

// Fetch should be by position,level or null

export default router;
