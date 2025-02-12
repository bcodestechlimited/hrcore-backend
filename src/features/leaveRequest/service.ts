import { Document, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from './dto';
import { LeaveRequest } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { LeaveRequestModel } from '../../models';
import mailService from '../../services/mailService';

export default class LeaveRequestService {
  /**
   * Fetches LeaveRequests from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the LeaveRequests by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of LeaveRequests that match the provided queries and conditions.
   */
  static async fetch(
    queries: FilterQuery<LeaveRequest>,
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<LeaveRequest>>> {
    try {
      let foundLeaveRequests: QueryReturn<LeaveRequest>;
      if (conditions) {
        foundLeaveRequests = await find(LeaveRequestModel, queries, conditions);
      } else {
        foundLeaveRequests = await find(LeaveRequestModel, queries);
      }
      return {
        success: true,
        message: 'LeaveRequests fetched successfully',
        data: foundLeaveRequests,
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
    payload: CreateLeaveRequestDto,
    data: Partial<LeaveRequest> = {},
  ): Promise<serviceResponseType<LeaveRequest>> {
    // return await LeaveRequestModel.create(data);
    validateDTO(CreateLeaveRequestDto, payload);
    try {
      const createdLeaveRequest = await LeaveRequestModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'LeaveRequest created successfully',
        data: createdLeaveRequest,
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
    queries: FilterQuery<LeaveRequest>,
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<LeaveRequest & Document>> {
    try {
      let foundLeaveRequest: LeaveRequest & Document;
      if (conditions) {
        foundLeaveRequest = await findOne(
          LeaveRequestModel,
          queries,
          conditions,
        );
      } else {
        foundLeaveRequest = await findOne(LeaveRequestModel, queries);
      }
      return {
        success: true,
        message: 'LeaveRequest fetched successfully',
        data: foundLeaveRequest,
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
    queries: { [key: string]: any; _id: string },
    data: UpdateQuery<UpdateLeaveRequestDto>,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<LeaveRequest | null>> {
    try {
      const foundLeaveRequest = await findOne(LeaveRequestModel, queries);
      if (!foundLeaveRequest) {
        throw {
          message: 'LeaveRequest not found or access denied',
          statusCode: 404,
        };
      }
      const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(
        foundLeaveRequest._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'LeaveRequest updated successfully',
        data: updatedLeaveRequest,
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

  static async deleteOne(
    id: string,
    queries: { [key: string]: any },
  ): Promise<serviceResponseType<LeaveRequest | null>> {
    try {
      const foundLeaveRequest = await findOne(LeaveRequestModel, queries, {
        _id: id,
      });
      if (!foundLeaveRequest) {
        throw {
          message: 'LeaveRequest not found or access denied',
          statusCode: 404,
        };
      }
      const deletedLeaveRequest = await LeaveRequestModel.findByIdAndDelete(
        foundLeaveRequest._id,
      );

      return {
        success: true,
        message: 'LeaveRequest deleted successfully',
        data: deletedLeaveRequest,
        statusCode: 204,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }
}
