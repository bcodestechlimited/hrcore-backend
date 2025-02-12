import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFormResponseDto, UpdateFormResponseDto } from './dto';
import { FormResponse } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FormResponseModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class FormResponseService {
  /**
   * Fetches FormResponses from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the FormResponses by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of FormResponses that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<FormResponse>>> {
    try {
      let foundFormResponses: QueryReturn<FormResponse>;
      if (conditions) {
        foundFormResponses = await find(FormResponseModel, queries, conditions);
      }
      else {
      foundFormResponses = await find(FormResponseModel, queries);
      }
      return {
        success: true,
        message: 'FormResponses fetched successfully',
        data: foundFormResponses,
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
    payload: CreateFormResponseDto,
    data: Partial<FormResponse> = {},
  ): Promise<serviceResponseType<FormResponse>> {
    // return await FormResponseModel.create(data);
    validateDTO(CreateFormResponseDto, payload);
    try {
      const createdFormResponse = await FormResponseModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'FormResponse created successfully',
        data: createdFormResponse,
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
  ): Promise<serviceResponseType<FormResponse>> {
    try {
      let foundFormResponse;
      if (conditions) {
        foundFormResponse = await findOne(FormResponseModel, queries, conditions);
      }
      else {
      foundFormResponse = await findOne(FormResponseModel, queries);
      }
      return {
        success: true,
        message: 'FormResponse fetched successfully',
        data: foundFormResponse,
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
    data: UpdateFormResponseDto,
    others: UpdateQuery<FormResponse> & Partial<FormResponse> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FormResponse | null>> {
    try {
      // const foundFormResponse = await findOne(FormResponseModel, queries);
      // if (!foundFormResponse) {
      //   throw {
      //     message: 'FormResponse not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedFormResponse = await FormResponseModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedFormResponse) {
        throw {
          message: 'FormResponse not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FormResponse updated successfully',
        data: updatedFormResponse,
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
  ): Promise<serviceResponseType<DeletedResultType<FormResponse | null>>> {
    try {
      const deletedFormResponse = await FormResponseModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedFormResponse) {
        throw {
          message: 'FormResponse not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FormResponse deleted successfully',
        data: deletedFormResponse,
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
