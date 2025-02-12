import express, { Request, Response } from 'express';
import {
  canCreateJobApplication,
  canDeleteJobApplication,
  canFetchJobApplication,
  canUpdateJobApplication,
} from './guard';
import JobApplicationService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const JobApplicationPathName = '/JobApplication';
/**
 * @openapi
 * 
 * /JobApplication:
 *   post:
 *     summary: Create a new JobApplication
 *     tags:
 *       - JobApplications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: JobApplication created successfully
//  *         content:
//  *           application/json:
 */
router.post(
  '/',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    // const perm = throwPermIfError(await canCreateJobApplication(req, true));
    const content = throwIfError(
      await JobApplicationService.create(
        req.body,
        {
          // ...perm.query,
        },
        // { createdBy: req.user._id }
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all JobApplications
 *
 * @openapi
 *
 * /JobApplication:
 *   get:
 *     summary: Fetch all JobApplications
 *     tags:
 *       - JobApplications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: JobApplications fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchJobApplication(req, false));
    const content = throwIfError(
      await JobApplicationService.fetch(req.query, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single JobApplication by ID
 *
 * @openapi
 *
 * /JobApplication/{id}:
 *   get:
 *     summary: Fetch a single JobApplication by ID
 *     tags:
 *       - JobApplications
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
 *         description: JobApplication fetched successfully
 */
router.get(
  '/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchJobApplication(req, false));
    const content = throwIfError(
      await JobApplicationService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Updates a single JobApplication by ID
 * 
 * @openapi
 * 
 * /JobApplication/{id}:
 *   put:
 *     summary: Update a single JobApplication by ID
 *     tags:
 *       - JobApplications
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
 *         description: JobApplication updated successfully
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
    const perm = throwPermIfError(await canUpdateJobApplication(req, false));
    const content = throwIfError(
      await JobApplicationService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single JobApplication by ID
 * 
 * @openapi
 * 
 * /JobApplication/{id}:
 *   delete:
 *     summary: Delete a single JobApplication by ID
 *     tags:
 *       - JobApplications
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
 *         description: JobApplication deleted successfully
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
    const perm = throwPermIfError(await canDeleteJobApplication(req, false));
    const content = throwIfError(
      await JobApplicationService.deleteOne(req.params.id, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
