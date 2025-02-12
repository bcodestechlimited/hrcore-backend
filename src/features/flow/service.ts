import { QueryOptions } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFlowDto, UpdateFlowDto } from './dto';
import { Flow, FlowModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class FlowService {
  /**
   * Fetches Flows from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Flows by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Flows that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Flow>>> {
    try {
      let foundFlows: QueryReturn<Flow>;
      if (conditions) {
        foundFlows = await find(FlowModel, queries, conditions);
      }
      foundFlows = await find(FlowModel, queries);
      return {
        success: true,
        message: 'Flows fetched successfully',
        data: foundFlows,
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
    payload: CreateFlowDto,
    data: Partial<Flow> = {},
  ): Promise<serviceResponseType<Flow>> {
    // return await FlowModel.create(data);
    validateDTO(CreateFlowDto, payload);
    try {
      const createdFlow = await FlowModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Flow created successfully',
        data: createdFlow,
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
  ): Promise<serviceResponseType<Flow>> {
    try {
      let foundFlow;
      if (conditions) {
        foundFlow = await findOne(FlowModel, queries, conditions);
      }
      foundFlow = await findOne(FlowModel, queries);
      return {
        success: true,
        message: 'Flow fetched successfully',
        data: foundFlow,
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
    data: UpdateFlowDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Flow | null>> {
    try {
      const foundFlow = await findOne(FlowModel, queries);
      if (!foundFlow) {
        throw {
          message: 'Flow not found or access denied',
          statusCode: 404,
        };
      }
      const updatedFlow = await FlowModel.findByIdAndUpdate(
        foundFlow._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Flow updated successfully',
        data: updatedFlow,
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
  ): Promise<serviceResponseType<Flow | null>> {
    try {
      const foundFlow = await findOne(FlowModel, queries, {
        _id: id,
      });
      if (!foundFlow) {
        throw {
          message: 'Flow not found or access denied',
          statusCode: 404,
        };
      }
      const deletedFlow = await FlowModel.findByIdAndDelete(
        foundFlow._id,
      );

      return {
        success: true,
        message: 'Flow deleted successfully',
        data: deletedFlow,
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
