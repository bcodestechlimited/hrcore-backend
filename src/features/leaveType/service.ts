import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto';
import { LeaveType } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { LeaveTypeModel } from '../../models';

export default class LeaveTypeService {
  /**
   * Fetches LeaveTypes from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the LeaveTypes by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of LeaveTypes that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundLeaveTypes;
      if (conditions) {
        foundLeaveTypes = await find(LeaveTypeModel, queries, conditions);
      }
      foundLeaveTypes = await find(LeaveTypeModel, queries);
      return {
        success: true,
        message: 'LeaveTypes fetched successfully',
        data: foundLeaveTypes,
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
    payload: CreateLeaveTypeDto,
    data: Partial<LeaveType> = {},
  ): Promise<serviceResponseType> {
    // return await LeaveTypeModel.create(data);
    validateDTO(CreateLeaveTypeDto, payload);
    try {
      const createdLeaveType = await LeaveTypeModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'LeaveType created successfully',
        data: createdLeaveType,
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
      let foundLeaveType;
      if (conditions) {
        foundLeaveType = await findOne(LeaveTypeModel, queries, conditions);
      }
      foundLeaveType = await findOne(LeaveTypeModel, queries);
      return {
        success: true,
        message: 'LeaveType fetched successfully',
        data: foundLeaveType,
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
    data: UpdateLeaveTypeDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundLeaveType = await findOne(LeaveTypeModel, queries);
      if (!foundLeaveType) {
        throw {
          message: 'LeaveType not found or access denied',
          statusCode: 404,
        };
      }
      const updatedLeaveType = await LeaveTypeModel.findByIdAndUpdate(
        foundLeaveType._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'LeaveType updated successfully',
        data: updatedLeaveType,
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
  ): Promise<serviceResponseType> {
    try {
      const foundLeaveType = await findOne(LeaveTypeModel, queries, {
        _id: id,
      });
      if (!foundLeaveType) {
        throw {
          message: 'LeaveType not found or access denied',
          statusCode: 404,
        };
      }
      const deletedLeaveType = await LeaveTypeModel.findByIdAndDelete(
        foundLeaveType._id,
      );

      return {
        success: true,
        message: 'LeaveType deleted successfully',
        data: deletedLeaveType,
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
