import { Router, Request, Response } from 'express';
import generator from './generator';

import auth from '../features/auth/controller';
import voucherAccount from '../features/voucherAccount/controller';

import grade from '../features/grade/controller';

import invoiceEmail from '../features/invoiceEmail/controller';


import performanceReview from '../features/performanceReview/controller';

import performance from '../features/performance/controller';

import invoiceCode from '../features/invoiceCode/controller';

import announcement from '../features/announcement/controller';

import voucherCompanies from '../features/voucherCompanies/controller';

import voucher from '../features/voucher/controller';

import medias from '../features/medias/controller';

import invoiceAccount from '../features/invoiceAccount/controller';

import requestForm from '../features/requestForm/controller';

import request from '../features/request/controller';

import jobApplication from '../features/jobApplication/controller';

import formResponse from '../features/formResponse/controller';

import formQuestion from '../features/formQuestion/controller';

import form from '../features/form/controller';

import job from '../features/job/controller';

import resignation from '../features/resignation/controller';

import file from '../features/file/controller';

import tool from '../features/tool/controller';
import folder from '../features/folder/controller';

import qr from '../features/qr/controller';
import approvalFlow from '../features/approvalFlow/controller';
import flow from '../features/flow/controller';
import leaveRequest from '../features/leaveRequest/controller';

import user from '../features/user/controller';
import leaveFlow from '../features/leaveFlow/controller';

import company from '../features/company/controller';
import leaveType from '../features/leaveType/controller';
import department from '../features/department/controller';
import level from '../features/level/controller';
import position from '../features/position/controller';
import invoice from '../features/invoice/controller';
import invoiceItem from '../features/invoiceItem/controller';
import invoiceContact from '../features/invoiceContact/controller';
import invoiceTag from '../features/invoiceTag/controller';

import notification from '../controllers/notification.controller';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);

router.use('/company', company);

router.use('/leaveType', leaveType);

router.use('/department', department);

router.use('/level', level);

router.use('/position', position);

router.use('/leaveFlow', leaveFlow);

router.use('/job', job);

router.use('/qr', qr);

router.use('/approvalFlow', approvalFlow);

router.use('/flow', flow);

router.use('/leaveRequest', leaveRequest);

router.use('/tool', tool);
router.use('/folder', folder);
router.use('/file', file);
router.use('/resignation', resignation);
router.use('/job', job);
router.use('/form', form);

router.use('/formQuestion', formQuestion);
router.use('/formResponse', formResponse);
router.use('/job-application', jobApplication);
router.use('/request', request);
router.use('/requestForm', requestForm);

router.use('/invoice', invoice);
router.use('/invoiceItem', invoiceItem);
router.use('/invoiceContact', invoiceContact);
router.use('/invoiceTag', invoiceTag);

router.use('/invoiceAccount', invoiceAccount);
router.use('/medias', medias);
router.use('/voucher', voucher);
router.use('/voucherCompanies', voucherCompanies);
router.use('/announcement', announcement);
router.use('/notification', notification);
router.use('/invoiceCode', invoiceCode);
router.use('/performance', performance);
router.use('/performanceReview', performanceReview);
router.use('/invoiceEmail', invoiceEmail);
router.use('/grade', grade);
router.use('/voucherAccount', voucherAccount);
router.use('/', generator);

export default router;
