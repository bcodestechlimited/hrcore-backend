import express, { Request, Response } from 'express';
import {
  canCreateLeaveRequest,
  canDeleteLeaveRequest,
  canFetchLeaveRequest,
  canUpdateLeaveRequest,
} from './guard';
import LeaveRequestService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
import { isCompanyAdmin } from '../company/guard';
import { validateDTO } from '../../middlewares/validate';
import { ReviewDTO } from './dto';
import { authenticateCheck } from '../../middlewares/authentication';
import NotificationService from '../../appservice/notification.service';
import { LeaveRequest } from './model';
import { Types } from 'mongoose';
import mailService from '../../services/mailService';
import { isDocument } from '@typegoose/typegoose';
const router = express.Router();

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
      await LeaveRequestService.create(req.body, {
        createdBy: req.user._id,
        company: req.params.companyId as any,
        nextApprover: req.body.approvers[0],
      }),
    );
    response(res, content.statusCode, content.message, content.data);
    // send email
    await mailService(
      'Leave Request Created',
      req.user.email,
      `
      <p>Your leave request has been created</p>
      <p>Leave type: ${req.body.leaveType}</p>
      <p>Start date: ${req.body.startDate}</p>
      <p>End date: ${req.body.endDate}</p>
      <p>Justification: ${req.body.justification}</p>
      <p>Reliever: ${req.body.reliever}</p>
      <p>Status: ${req.body.status}</p>
      
    `,
    );

    // send mail to next approver
    const nextApprover: any = await LeaveRequestService.fetchOne({
      _id: (content.data as any)._id,
      _populate: 'nextApprover',
    });
    await mailService(
      'Review Leave Request',
      nextApprover.data.nextApprover.email,
      `
      <p>You have a leave request to review</p>
      <p>Leave type: ${req.body.leaveType}</p>
      <p>Start date: ${req.body.startDate}</p>
      <p>End date: ${req.body.endDate}</p>
      <p>Justification: ${req.body.justification}</p>
      <p>Reliever: ${req.body.reliever}</p>
      <p>Status: ${req.body.status}</p>
      
    `,
    );
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
    const perm = throwPermIfError(await canFetchLeaveRequest(req, true));
    const content = throwIfError(
      await LeaveRequestService.fetch(req.query, {
        // createdBy: req.user._id,
        ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get(
  '/:companyId/approvers',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    await authenticateCheck(req);
    const content = throwIfError(
      await LeaveRequestService.fetch(req.query, {
        nextApprover: req.user._id,
        // createdBy: req.user._id,
        company: req.params.companyId as any,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.get(
  '/:companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await canFetchLeaveRequest(req, true));
    const content = throwIfError(
      await LeaveRequestService.fetchOne(req.query, {
        _id: req.params.id,
        // createdBy: req.user._id,
        ...perm.query,
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
    const perm = throwPermIfError(await canUpdateLeaveRequest(req, true));
    const content = throwIfError(
      await LeaveRequestService.updateOne(
        { _id: req.params.id, ...perm.query },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.put(
  '/:companyId/:id/review',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const data = validateDTO(ReviewDTO, req.body);
    await authenticateCheck(req);
    let nextApprover: any = req.user._id;
    let query: any = {
      _id: req.params.id,
      nextApprover: req.user._id,
    };
    if (req.user.isAdmin) {
      query = {
        _id: req.params.id,
      };
    }
    const leaveRequest = throwIfError(
      await LeaveRequestService.fetchOne({
        ...query,
        _populate: 'createdBy',
      }),
    );

    console.log(leaveRequest.data, 'leaveRequest.data');

    if (data.status === 'Approved') {
      // next approver is the next person in the chain
      const nextApproverIndex =
        leaveRequest.data.approvers.findIndex(
          (approver) => approver === req.user._id,
        ) + 1;
      nextApprover =
        leaveRequest.data.approvers[nextApproverIndex] || req.user._id;

      await NotificationService.send(
        {
          message: `Your leave request has been approved`,
          payload: leaveRequest.data._id,
          title: 'Leave Request Approved',
          user: leaveRequest.data.createdBy as Types.ObjectId,
          type: LeaveRequest.name,
        },
        'user',
        (isDocument(leaveRequest.data.createdBy)
          ? leaveRequest.data.createdBy._id
          : leaveRequest.data.createdBy) as any,
      );

      await mailService(
        'Leave Request Approved',
        isDocument(leaveRequest.data.createdBy)
          ? leaveRequest.data.createdBy.email
          : '',
        `
        <p>Your leave request has been approved</p>
        <p>Leave type: ${leaveRequest.data.leaveType}</p>
        <p>Start date: ${leaveRequest.data.startDate}</p>
        <p>End date: ${leaveRequest.data.endDate}</p>
        <p>Justification: ${leaveRequest.data.justification}</p>
        <p>Reliever: ${leaveRequest.data.reliever}</p>
        <p>Status: ${leaveRequest.data.status}</p>
        
      `,
      );
    }

    const content = throwIfError(
      await LeaveRequestService.updateOne(
        { _id: req.params.id, nextApprover: req.user._id },
        {
          status: data.status,
          nextApprover,
        },
      ),
    );
    response(res, content.statusCode, content.message, content.data);
    // send email
    await mailService(
      'Leave Request Reviewed',
      req.user.email,
      `
      <p>Your leave request has been reviewed</p>
      <p>Leave type: ${leaveRequest.data.leaveType}</p>
      <p>Start date: ${leaveRequest.data.startDate}</p>
      <p>End date: ${leaveRequest.data.endDate}</p>
      <p>Justification: ${leaveRequest.data.justification}</p>
      <p>Reliever: ${leaveRequest.data.reliever}</p>
      <p>Status: ${leaveRequest.data.status}</p>
      
    `,
    );
  },
);

router.put(
  '/companyId/:id',
  async (
    req: Request<{
      companyId: string;
      id: string;
    }>,
    res: Response,
  ) => {
    const perm = throwPermIfError(await isCompanyAdmin(req, true));
    const content = throwIfError(
      await LeaveRequestService.updateOne(
        { _id: req.params.id, company: req.params.companyId as any },
        req.body,
      ),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteLeaveRequest(req, false));
  const content = throwIfError(
    await LeaveRequestService.deleteOne(req.params.id, {
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
      await LeaveRequestService.deleteOne(req.params.id, {
        company: req.params.companyId as any,
        // createdBy: req.user._id,
        // ...perm.query,
      }),
    );
    return response(res, content.statusCode, content.message, content.data);
  },
);

export default router;
