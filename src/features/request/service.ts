import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateRequestDto, UpdateRequestDto } from './dto';
import { Request } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { RequestModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class RequestService {
  /**
   * Fetches Requests from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Requests by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Requests that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Request>>> {
    try {
      let foundRequests: QueryReturn<Request>;
      if (conditions) {
        foundRequests = await find(RequestModel, queries, conditions);
      } else {
        foundRequests = await find(RequestModel, queries);
      }
      return {
        success: true,
        message: 'Requests fetched successfully',
        data: foundRequests,
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
    payload: CreateRequestDto,
    data: Partial<Request> = {},
  ): Promise<serviceResponseType<Request>> {
    // return await RequestModel.create(data);
    validateDTO(CreateRequestDto, payload);
    try {
      const createdRequest = await RequestModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Request created successfully',
        data: createdRequest,
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
  ): Promise<serviceResponseType<Request>> {
    try {
      let foundRequest;
      if (conditions) {
        foundRequest = await findOne(RequestModel, queries, conditions);
      } else {
        foundRequest = await findOne(RequestModel, queries);
      }
      return {
        success: true,
        message: 'Request fetched successfully',
        data: foundRequest,
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
    data: UpdateRequestDto,
    others: UpdateQuery<Request> & Partial<Request> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Request | null>> {
    try {
      // const foundRequest = await findOne(RequestModel, queries);
      // if (!foundRequest) {
      //   throw {
      //     message: 'Request not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedRequest = await RequestModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedRequest) {
        throw {
          message: 'Request not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Request updated successfully',
        data: updatedRequest,
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
  ): Promise<serviceResponseType<DeletedResultType<Request | null>>> {
    try {
      const deletedRequest = await RequestModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedRequest) {
        throw {
          message: 'Request not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Request deleted successfully',
        data: deletedRequest,
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
