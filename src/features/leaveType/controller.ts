import express, { Request, Response } from 'express';
import {
  canCreateLeaveType,
  canDeleteLeaveType,
  canFetchLeaveType,
  canUpdateLeaveType,
} from './guard';
import LeaveTypeService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyAdmin } from '../company/guard';
const router = express.Router();
const LeaveTypePathName = '/LeaveType';
/**
 * @openapi
 * 
 * /LeaveType:
 *   post:
 *     summary: Create a new LeaveType
 *     tags:
 *       - LeaveTypes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: LeaveType created successfully
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
    throwPermIfError(await canCreateLeaveType(req));
    const content = throwIfError(
      await LeaveTypeService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

/**
 * Fetches all LeaveTypes
 *
 * @openapi
 *
 * /LeaveType:
 *   get:
 *     summary: Fetch all LeaveTypes
 *     tags:
 *       - LeaveTypes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: LeaveTypes fetched successfully
 */
router.get(
  '/',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canFetchLeaveType(req));
    const content = throwIfError(
      await LeaveTypeService.fetch(req.query, {
        createdBy: req.user._id,
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get(
  '/:companyId',
  async (
    req: Request<{
      companyId: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await canFetchLeaveType(req));
    const content = throwIfError(
      await LeaveTypeService.fetch(req.query, {
        createdBy: req.user._id,
        company: req.params.companyId,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);


router.put(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await LeaveTypeService.updateOne(
        { _id: req.params.id, company: req.params.companyId },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);
/**
 * Updates a single LeaveType by ID
 * 
 * @openapi
 * 
 * /LeaveType/{id}:
 *   put:
 *     summary: Update a single LeaveType by ID
 *     tags:
 *       - LeaveTypes
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
 *         description: LeaveType updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canUpdateLeaveType(req));
  const content = throwIfError(
    await LeaveTypeService.updateOne({ _id: req.params.id }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});





router.delete('/:companyId/:id', async (req: Request<{
  companyId: string;
  id: string;
}>, res: Response) => {
  throwPermIfError(await isCompanyAdmin(req, true));
  const content = throwIfError(
    await LeaveTypeService.deleteOne(req.params.id, {
      company: req.params.companyId,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});
/**
 * Deletes a single LeaveType by ID
 * 
 * @openapi
 * 
 * /LeaveType/{id}:
 *   delete:
 *     summary: Delete a single LeaveType by ID
 *     tags:
 *       - LeaveTypes
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
 *         description: LeaveType deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  throwPermIfError(await canDeleteLeaveType(req));
  const content = throwIfError(
    await LeaveTypeService.deleteOne(req.params.id, {
      createdBy: req.user._id,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
