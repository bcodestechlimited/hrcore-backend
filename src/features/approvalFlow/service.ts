import { QueryOptions } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateApprovalFlowDto, UpdateApprovalFlowDto } from './dto';
import { ApprovalFlow, ApprovalFlowModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class ApprovalFlowService {
  /**
   * Fetches ApprovalFlows from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the ApprovalFlows by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of ApprovalFlows that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<ApprovalFlow>>> {
    try {
      let foundApprovalFlows: QueryReturn<ApprovalFlow>;
      if (conditions) {
        foundApprovalFlows = await find(ApprovalFlowModel, queries, conditions);
      }
      foundApprovalFlows = await find(ApprovalFlowModel, queries);
      return {
        success: true,
        message: 'ApprovalFlows fetched successfully',
        data: foundApprovalFlows,
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
    payload: CreateApprovalFlowDto,
    data: Partial<ApprovalFlow> = {},
  ): Promise<serviceResponseType<ApprovalFlow>> {
    // return await ApprovalFlowModel.create(data);
    validateDTO(CreateApprovalFlowDto, payload);
    try {
      const createdApprovalFlow = await ApprovalFlowModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'ApprovalFlow created successfully',
        data: createdApprovalFlow,
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
  ): Promise<serviceResponseType<ApprovalFlow>> {
    try {
      let foundApprovalFlow;
      if (conditions) {
        foundApprovalFlow = await findOne(ApprovalFlowModel, queries, conditions);
      }
      foundApprovalFlow = await findOne(ApprovalFlowModel, queries);
      return {
        success: true,
        message: 'ApprovalFlow fetched successfully',
        data: foundApprovalFlow,
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
    data: UpdateApprovalFlowDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<ApprovalFlow | null>> {
    try {
      const foundApprovalFlow = await findOne(ApprovalFlowModel, queries);
      if (!foundApprovalFlow) {
        throw {
          message: 'ApprovalFlow not found or access denied',
          statusCode: 404,
        };
      }
      const updatedApprovalFlow = await ApprovalFlowModel.findByIdAndUpdate(
        foundApprovalFlow._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'ApprovalFlow updated successfully',
        data: updatedApprovalFlow,
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
  ): Promise<serviceResponseType<ApprovalFlow | null>> {
    try {
      const foundApprovalFlow = await findOne(ApprovalFlowModel, queries, {
        _id: id,
      });
      if (!foundApprovalFlow) {
        throw {
          message: 'ApprovalFlow not found or access denied',
          statusCode: 404,
        };
      }
      const deletedApprovalFlow = await ApprovalFlowModel.findByIdAndDelete(
        foundApprovalFlow._id,
      );

      return {
        success: true,
        message: 'ApprovalFlow deleted successfully',
        data: deletedApprovalFlow,
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
