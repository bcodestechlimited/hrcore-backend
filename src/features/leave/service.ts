import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateLeaveDto, UpdateLeaveDto } from './dto';
import { Leave, LeaveModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class LeaveService {
  /**
   * Fetches Leaves from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Leaves by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Leaves that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundLeaves;
      if (conditions) {
        foundLeaves = await find(LeaveModel, queries, conditions);
      }
      foundLeaves = await find(LeaveModel, queries);
      return {
        success: true,
        message: 'Leaves fetched successfully',
        data: foundLeaves,
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
    payload: CreateLeaveDto,
    data: Partial<Leave> = {},
  ): Promise<serviceResponseType> {
    // return await LeaveModel.create(data);
    validateDTO(CreateLeaveDto, payload);
    try {
      const createdLeave = await LeaveModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Leave created successfully',
        data: createdLeave,
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
      let foundLeave;
      if (conditions) {
        foundLeave = await findOne(LeaveModel, queries, conditions);
      }
      foundLeave = await findOne(LeaveModel, queries);
      return {
        success: true,
        message: 'Leave fetched successfully',
        data: foundLeave,
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
    data: UpdateLeaveDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundLeave = await findOne(LeaveModel, queries);
      if (!foundLeave) {
        throw {
          message: 'Leave not found or access denied',
          statusCode: 404,
        };
      }
      const updatedLeave = await LeaveModel.findByIdAndUpdate(
        foundLeave._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Leave updated successfully',
        data: updatedLeave,
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
      const foundLeave = await findOne(LeaveModel, queries, {
        _id: id,
      });
      if (!foundLeave) {
        throw {
          message: 'Leave not found or access denied',
          statusCode: 404,
        };
      }
      const deletedLeave = await LeaveModel.findByIdAndDelete(
        foundLeave._id,
      );

      return {
        success: true,
        message: 'Leave deleted successfully',
        data: deletedLeave,
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
