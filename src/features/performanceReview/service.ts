import { QueryOptions, Types, UpdateQuery } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreatePerformanceReviewDto, UpdatePerformanceReviewDto } from './dto';
import { PerformanceReview } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { PerformanceReviewModel } from '../../models';
import {
  DeletedResultType,
  FindOneReturnType,
} from '../../utilities/templates/types';
import CompanyService from '../company/service';
import UserModel from '../../models/userModel';

export default class PerformanceReviewService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundPerformanceReviews;
      if (conditions) {
        foundPerformanceReviews = await find(
          PerformanceReviewModel,
          queries,
          conditions,
        );
      } else {
        foundPerformanceReviews = await find(PerformanceReviewModel, queries);
      }
      return {
        success: true,
        message: 'Performance Reviews fetched successfully',
        data: foundPerformanceReviews,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async create(
    userId: Types.ObjectId,
    payload: CreatePerformanceReviewDto,
    data: Partial<PerformanceReview> = {},
  ): Promise<serviceResponseType<PerformanceReview>> {
    // return await PerformanceReviewModel.create(data);
    try {
      const createdPerformanceReview = await PerformanceReviewModel.create({
        ...payload,
        ...data,
      });
      const user = await UserModel.findOne({
        _id: userId,
      }).orFail();
      await CompanyService.sendEmailToLineManager(
        createdPerformanceReview.company as Types.ObjectId,
        `You have a new performance review`,
        `A new performance review has been created for you to review`,
        {
          gradeForPosition1: {
            $in: [user.position],
          },
        },
      );

      return {
        success: true,
        message: 'Performance Review created successfully',
        data: createdPerformanceReview,
        statusCode: 201,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async fetchOne(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundPerformanceReview;
      if (conditions) {
        foundPerformanceReview = await findOne(
          PerformanceReviewModel,
          queries,
          conditions,
        );
      } else {
        foundPerformanceReview = await findOne(PerformanceReviewModel, queries);
      }
      return {
        success: true,
        message: 'Performance Review fetched successfully',
        data: foundPerformanceReview,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async updateOne(
    userId: Types.ObjectId,
    queries: { [key: string]: any; _id: string },
    data: Partial<UpdatePerformanceReviewDto>,
    others: UpdateQuery<PerformanceReview> & Partial<PerformanceReview> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FindOneReturnType<PerformanceReview>>> {
    try {
      const performanceExists = await PerformanceReviewModel.findOne({
        ...queries,
      }).orFail();
      if (performanceExists.createdBy?.toString() === userId.toString()) {
        // only pick the fields that are allowed to be updated by the user
        const allowedFields = [
          'staffRemarkForManager1',
          'staffRemarkForManager2',
          'staffRemarkForStaff',
        ];
        // remove keys not in the allowedFields array
        Object.keys(data).forEach(
          (key) => !allowedFields.includes(key) && delete (data as any)[key],
        );
      }

      const updatedPerformanceReview =
        await PerformanceReviewModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        )?.populate('createdBy');
      if (!updatedPerformanceReview) {
        throw {
          message: 'Performance Review not found or access denied',
          statusCode: 404,
        };
      }

      const user = await UserModel.findOne({
        _id: updatedPerformanceReview.createdBy,
      }).orFail();
      if (
        userId?.toString() === updatedPerformanceReview.createdBy?.toString()
      ) {
        if (data.staffRemarkForManager1) {
          if (data.staffRemarkForManager1 === 'Accepted') {
            await CompanyService.sendEmailToLineManager(
              updatedPerformanceReview.company as Types.ObjectId,
              `Performance Review Accepted`,
              `${user.firstName} ${user.lastName} has accepted the performance review sent to them
              The next step is for you to review
            `,
              {
                gradeForPosition2: {
                  $in: [user.position],
                },
              },
            );
          } else {
            await CompanyService.sendEmailToLineManager(
              updatedPerformanceReview.company as Types.ObjectId,
              `${user.firstName} ${user.lastName} has made a remark`,
              `${user.firstName} ${user.lastName} has made a remark on the performance review you sent to them
            Remark: ${data.staffRemarkForManager1}
          Kindly login to your account to review
          `,
              {
                gradeForPosition1: {
                  $in: [user.position],
                },
              },
            );
          }
        } else if (data.staffRemarkForManager2) {
          if (data.staffRemarkForManager2 === 'Accepted') {
            await CompanyService.sendEmailToLineManager(
              updatedPerformanceReview.company as Types.ObjectId,
              `Performance Review Dialog Completed`,
              `${user.firstName} ${user.lastName} has accepted the performance review sent to them
              This ends the performance review dialog
            `,
              {
                gradeForPosition1: {
                  $in: [user.position],
                },
              },
            );
          } else {
            await CompanyService.sendEmailToLineManager(
              updatedPerformanceReview.company as Types.ObjectId,
              `${user.firstName} ${user.lastName} has made a remark`,
              `${user.firstName} ${user.lastName} has made a remark on the performance review you sent to them
            Remark: ${data.staffRemarkForManager2}
          Kindly login to your account to review
          `,
              {
                gradeForPosition2: {
                  $in: [user.position],
                },
              },
            );
          }
        }
      } else {
        const isLineManager1 = await UserModel.findOne({
          gradeForPosition1: user.position,
          _id: userId,
        });
        if (isLineManager1) {
          await CompanyService.sendEMailToStaff(
            updatedPerformanceReview.company as Types.ObjectId,
            `Line Manager 1 has updated your performance review`,
            `Your performance review has been updated by your line manager
          Kindly login to your account to review
          `,
            user._id,
          );
        } else {
          await CompanyService.sendEMailToStaff(
            updatedPerformanceReview.company as Types.ObjectId,
            `Line Manager 2 has updated your performance review`,
            `Your performance review has been updated by your line manager
          Kindly login to your account to review
          `,
            user._id,
          );
        }
      }

      return {
        success: true,
        message: 'Performance Review updated successfully',
        data: updatedPerformanceReview,
        statusCode: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async deleteOne(
    id: string,
    queries: { [key: string]: any },
  ): Promise<serviceResponseType<DeletedResultType<PerformanceReview | null>>> {
    try {
      const deletedPerformanceReview =
        await PerformanceReviewModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedPerformanceReview) {
        throw {
          message: 'Performance Review not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Performance Review deleted successfully',
        data: deletedPerformanceReview,
        statusCode: 204,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }
}
