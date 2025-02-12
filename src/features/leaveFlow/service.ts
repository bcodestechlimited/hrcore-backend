import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateLeaveFlowDto, UpdateLeaveFlowDto } from './dto';
import { LeaveFlow, LeaveFlowModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class LeaveFlowService {
  /**
   * Fetches LeaveFlows from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the LeaveFlows by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of LeaveFlows that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundLeaveFlows;
      if (conditions) {
        foundLeaveFlows = await find(LeaveFlowModel, queries, conditions);
      }
      foundLeaveFlows = await find(LeaveFlowModel, queries);
      return {
        success: true,
        message: 'LeaveFlows fetched successfully',
        data: foundLeaveFlows,
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
    payload: CreateLeaveFlowDto,
    data: Partial<LeaveFlow> = {},
  ): Promise<serviceResponseType> {
    // return await LeaveFlowModel.create(data);
    validateDTO(CreateLeaveFlowDto, payload);
    try {
      const createdLeaveFlow = await LeaveFlowModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'LeaveFlow created successfully',
        data: createdLeaveFlow,
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
      let foundLeaveFlow;
      if (conditions) {
        foundLeaveFlow = await findOne(LeaveFlowModel, queries, conditions);
      }
      foundLeaveFlow = await findOne(LeaveFlowModel, queries);
      return {
        success: true,
        message: 'LeaveFlow fetched successfully',
        data: foundLeaveFlow,
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
    data: UpdateLeaveFlowDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundLeaveFlow = await findOne(LeaveFlowModel, queries);
      if (!foundLeaveFlow) {
        throw {
          message: 'LeaveFlow not found or access denied',
          statusCode: 404,
        };
      }
      const updatedLeaveFlow = await LeaveFlowModel.findByIdAndUpdate(
        foundLeaveFlow._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'LeaveFlow updated successfully',
        data: updatedLeaveFlow,
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
      const foundLeaveFlow = await findOne(LeaveFlowModel, queries, {
        _id: id,
      });
      if (!foundLeaveFlow) {
        throw {
          message: 'LeaveFlow not found or access denied',
          statusCode: 404,
        };
      }
      const deletedLeaveFlow = await LeaveFlowModel.findByIdAndDelete(
        foundLeaveFlow._id,
      );

      return {
        success: true,
        message: 'LeaveFlow deleted successfully',
        data: deletedLeaveFlow,
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
