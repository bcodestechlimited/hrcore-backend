import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateRequestFormDto, UpdateRequestFormDto } from './dto';
import { RequestForm } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { RequestFormModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class RequestFormService {
  /**
   * Fetches RequestForms from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the RequestForms by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of RequestForms that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<RequestForm>>> {
    try {
      let foundRequestForms: QueryReturn<RequestForm>;
      if (conditions) {
        foundRequestForms = await find(RequestFormModel, queries, conditions);
      }
      else {
      foundRequestForms = await find(RequestFormModel, queries);
      }
      return {
        success: true,
        message: 'RequestForms fetched successfully',
        data: foundRequestForms,
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
    payload: CreateRequestFormDto,
    data: Partial<RequestForm> = {},
  ): Promise<serviceResponseType<RequestForm>> {
    // return await RequestFormModel.create(data);
    validateDTO(CreateRequestFormDto, payload);
    try {
      const createdRequestForm = await RequestFormModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'RequestForm created successfully',
        data: createdRequestForm,
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
  ): Promise<serviceResponseType<RequestForm>> {
    try {
      let foundRequestForm;
      if (conditions) {
        foundRequestForm = await findOne(RequestFormModel, queries, conditions);
      }
      else {
      foundRequestForm = await findOne(RequestFormModel, queries);
      }
      return {
        success: true,
        message: 'RequestForm fetched successfully',
        data: foundRequestForm,
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
    data: UpdateRequestFormDto,
    others: UpdateQuery<RequestForm> & Partial<RequestForm> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<RequestForm | null>> {
    try {
      // const foundRequestForm = await findOne(RequestFormModel, queries);
      // if (!foundRequestForm) {
      //   throw {
      //     message: 'RequestForm not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedRequestForm = await RequestFormModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedRequestForm) {
        throw {
          message: 'RequestForm not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'RequestForm updated successfully',
        data: updatedRequestForm,
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
  ): Promise<serviceResponseType<DeletedResultType<RequestForm | null>>> {
    try {
      const deletedRequestForm = await RequestFormModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedRequestForm) {
        throw {
          message: 'RequestForm not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'RequestForm deleted successfully',
        data: deletedRequestForm,
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
