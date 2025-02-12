import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
  VerifyEmailResendDto,
} from './dto';
import User, { AllUserType, UserType } from '../../models/userModel';
import { serviceResponseType, throwIfError } from '../../utilities/response';
import { genToken, verifyToken } from '../../utilities/token';
import AuthTemplates from '../../utilities/templates/auth';
import mailService from '../../services/mailService';
import CompanyService from '../company/service';
import { validateDTO } from '../../middlewares/validate';
import UserModel from '../../models/userModel';

export default class AuthService {
  static async adminLoginAccount(data: {
    email: string;
  }): Promise<serviceResponseType> {
    try {
      const user = await UserModel.findOne({
        email: data.email,
      }).orFail(new Error('User not found'));
     
      const token = await (user as UserType).generateJWT();
      return {
        success: true,
        message: 'Login successful',
        data: { user, token },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }
  static async login(data: LoginDto): Promise<serviceResponseType> {
    try {
      const { user, error } = await User.authenticate()(
        data.username,
        data.password,
      );
      const theUser = user as UserType;
      if (error) {
        return {
          success: false,
          message: error.message,
          data: error,
        };
      }
      if (!user) {
        return {
          success: false,
          message: 'User not found',
          data: user,
        };
      }
      if (user.email && !user.emailVerified) {
        return {
          success: false,
          message: 'Email not verified',
          data: user,
        };
      }
      const token = await theUser.generateJWT();
      return {
        success: true,
        message: 'Login successful',
        data: { user, token },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }

  static async registerStaff(data: RegisterDto): Promise<serviceResponseType> {
    try {
      const { email, password } = data;

      const user = await User.register(
        new User({
          ...data,
          company: data.companyId,
          status: 'active',
          type: 'staff',
          emailVerified: true,
          email,
        }),
        password,
      );

      throwIfError(
        await CompanyService.updateOne(
          {
            _id: data.companyId,
          },
          {},
          {
            $addToSet: {
              staffs: user._id,
            },
          },
        ),
      );

      await mailService(
        'Welcome to the team',
        email,
        // welcome message with email and password
        `<p>Hi ${user.firstName},</p>
      <p>Welcome to the team.</p>
      <p>Here are your login details:</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Kindly change your password after logging in.</p>
      <p>Thank you.</p>
      <p>Regards,</p>
      <p>Team</p>
      `,
      );

      return {
        success: true,
        message: 'Staff created successfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async changePassword(
    body: ChangePasswordDto,
    user: UserType,
  ): Promise<serviceResponseType> {
    try {
      const { oldPassword, newPassword } = body;
      const theuser = user as AllUserType;
      if (!user) {
        return {
          success: false,
          message: 'User not found',
          data: user,
        };
      }
      await theuser.changePassword(oldPassword, newPassword);
      return {
        success: true,
        message: 'Password changed successfully',
        data: user,
      };
    } catch (error: any) {
      if (error.name === 'IncorrectPasswordError') {
        return {
          success: false,
          message: 'Incorrect password',
          data: error,
        };
      }
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async resetPassword(
    body: ResetPasswordDto,
  ): Promise<serviceResponseType> {
    const { token, newPassword } = body;
    try {
      const emailVerify = await verifyToken(token, 'reset-password');

      if (!emailVerify.valid) {
        return {
          success: false,
          message: 'Invalid token',
          data: emailVerify,
        };
      }
      const { userId } = emailVerify;
      const user = (await User.findById(userId)) as AllUserType | null;
      if (!user) {
        return {
          success: false,
          message: 'User not found',
          data: user,
        };
      }
      // await user.resetAttempts();
      await user.setPassword(newPassword);
      await user.save();
      await AuthTemplates.passwordResetConfirmationTemplate(user);
      return {
        success: true,
        message: 'Password reset successfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }

  static async requestResetPassword(
    body: ForgotPasswordDto,
  ): Promise<serviceResponseType> {
    const { email } = body;
    try {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
          data: user,
          statusCode: 404,
        };
      }

      const theToken = await genToken(user, 'User', 'reset-password');

      await AuthTemplates.resetPasswordTemplate(user, theToken);
      return {
        success: true,
        message:
          'If an account with this email exists, an email has been sent to you.',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }
  static async verifyEmailAccount(body: VerifyEmailDto) {
    try {
      const { token } = body;

      const theToken = await verifyToken(token, 'verify-email');
      if (!theToken.valid) {
        // return response(res, 401, theToken.message);
        return {
          success: false,
          message: theToken.message,
          data: theToken,
        };
      }
      const { userId } = theToken;
      const user = await User.findById(userId);
      const theUser = await User.findByIdAndUpdate(
        userId,
        {
          emailVerified: true,
        },
        { strict: false, new: true, runValidators: true },
      );

      return {
        success: true,
        message: 'Email verified successfully',
        data: theUser,
        statusCode: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }

  static async sendVerificationEmail(
    body: VerifyEmailResendDto,
  ): Promise<serviceResponseType> {
    const { email } = body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return {
          success: false,
          message:
            'If an account with this email exists, an email has been sent to you.',
          data: user,
        };
      }
      if (user.emailVerified) {
        return {
          success: false,
          message: 'Account already verified',
          data: user,
        };
      }
      const theToken = await genToken(user, 'User', 'verify-email');
      await AuthTemplates.verifyEmailTemplate(user, theToken);
      return {
        success: true,
        message:
          'If an account with this email exists, an email has been sent to you.',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '',
        data: error,
      };
    }
  }
}
