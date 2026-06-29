import express, { Request, Response } from 'express';
import AuthService from './service';
import _ from 'passport-local-mongoose';
import response, { throwIfError } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
  VerifyEmailResendDto,
} from './dto';
import {
  authenticate,
  authenticateAdmin,
} from '../../middlewares/authentication';
import { remoteCallWithMethod } from '../../utilities';
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const body = validateDTO(LoginDto, req.body);
  const data = throwIfError(await AuthService.login(body));
  return response(res, data.statusCode, data.message, data.data);
});

router.post(
  '/login-admin',
  authenticateAdmin,
  async (req: Request, res: Response) => {
    const data = throwIfError(await AuthService.adminLoginAccount(req.body));
    return response(res, data.statusCode, data.message, data.data);
  },
);

router.post('/register-staff', async (req: Request, res: Response) => {
  const body = validateDTO(RegisterDto, req.body);

  const data = throwIfError(await AuthService.registerStaff(body));
  return response(res, data.statusCode, data.message, data.data);
});

router.post(
  '/change-password',
  authenticate,
  async (req: Request, res: Response) => {
    const body = validateDTO(ChangePasswordDto, req.body);
    const data = throwIfError(await AuthService.changePassword(body, req.user));
    return response(res, data.statusCode, data.message, data.data);
  },
);

router.post('/verify-email-account', async (req: Request, res: Response) => {
  const body = validateDTO(VerifyEmailDto, req.body);
  const data = throwIfError(await AuthService.verifyEmailAccount(body));
  return response(res, 201, data.message, data.data);
});

router.post(
  '/request-email-verification',
  async (req: Request, res: Response) => {
    const body = validateDTO(VerifyEmailResendDto, req.body);
    const data = throwIfError(await AuthService.sendVerificationEmail(body));
    return response(res, 201, data.message, data.data);
  },
);

router.post('/request-reset-password', async (req: Request, res: Response) => {
  const body = validateDTO(ForgotPasswordDto, req.body);
  const data = throwIfError(await AuthService.requestResetPassword(body));
  return response(res, 201, data.message, data.data);
});

router.post('/reset-password', async (req: Request, res: Response) => {
  const body = validateDTO(ResetPasswordDto, req.body);
  const data = throwIfError(await AuthService.resetPassword(body));
  return response(res, 201, data.message, data.data);
});

router.post('/py/:path', (req, res) =>
  remoteCallWithMethod(req, res, {
    allowedService: {
      '/bank': 'GET',
    },
    baseUrl: 'https://api.paystack.co',
    mainUrl: '/py',
    config: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  }),
);
export default router;
