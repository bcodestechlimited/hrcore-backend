import express from 'express';
import {
  authenticateAdmin,
  checkUserTypes,
} from '../middlewares/authentication';
import controlController from './control.controller';

const router = express.Router();

router.get('/users', authenticateAdmin, controlController.getUsers);

router.put('/users/:id', authenticateAdmin, controlController.updateUserStatus);

router.post('/email', authenticateAdmin, controlController.sendEmail);



router.post(
  '/users',
  authenticateAdmin,
  checkUserTypes(['super']),
  controlController.addAdmin,
);

router.post(
  '/users/login',
  checkUserTypes(['super']),
  controlController.loginUser,
);

export default router;
