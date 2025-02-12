import express, { Request, Response } from 'express';
import { canCreateJob, canDeleteJob, canFetchJob, canUpdateJob } from './guard';
import JobService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const JobPathName = '/Job';
/**
 * @openapi
 * 
 * /Job:
 *   post:
 *     summary: Create a new Job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Job created successfully
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
    const perm = throwPermIfError(await canCreateJob(req, true));
    const content = throwIfError(
      await JobService.create(req.body, { ...perm.query }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all Jobs
 *
 * @openapi
 *
 * /Job:
 *   get:
 *     summary: Fetch all Jobs
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 */
router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchJob(req, false));
    const content = throwIfError(
      await JobService.fetch(req.query, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches a single Job by ID
 *
 * @openapi
 *
 * /Job/{id}:
 *   get:
 *     summary: Fetch a single Job by ID
 *     tags:
 *       - Jobs
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
 *         description: Job fetched successfully
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
    const perm = throwPermIfError(await canFetchJob(req, false));
    const content = throwIfError(
      await JobService.fetchOne(req.query, {
        _id: req.params.id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Updates a single Job by ID
 * 
 * @openapi
 * 
 * /Job/{id}:
 *   put:
 *     summary: Update a single Job by ID
 *     tags:
 *       - Jobs
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
 *         description: Job updated successfully
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
    const perm = throwPermIfError(await canUpdateJob(req, false));
    const content = throwIfError(
      await JobService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Deletes a single Job by ID
 * 
 * @openapi
 * 
 * /Job/{id}:
 *   delete:
 *     summary: Delete a single Job by ID
 *     tags:
 *       - Jobs
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
 *         description: Job deleted successfully
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
    const perm = throwPermIfError(await canDeleteJob(req, false));
    const content = throwIfError(
      await JobService.deleteOne(req.params.id, {
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
