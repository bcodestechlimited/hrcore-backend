import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreatePerformanceDto, UpdatePerformanceDto } from './dto';
import { Performance } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { PerformanceModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class PerformanceService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundPerformances;
      if (conditions) {
        foundPerformances = await find(PerformanceModel, queries, conditions);
      } else {
        foundPerformances = await find(PerformanceModel, queries);
      }
      return {
        success: true,
        message: 'Performances fetched successfully',
        data: foundPerformances,
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
    payload: CreatePerformanceDto,
    data: Partial<Performance> = {},
  ): Promise<serviceResponseType<Performance>> {
    // return await PerformanceModel.create(data);
    validateDTO(CreatePerformanceDto, payload);
    try {
      const createdPerformance = await PerformanceModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Performance created successfully',
        data: createdPerformance,
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
      let foundPerformance;
      if (conditions) {
        foundPerformance = await findOne(PerformanceModel, queries, conditions);
      } else {
        foundPerformance = await findOne(PerformanceModel, queries);
      }
      return {
        success: true,
        message: 'Performance fetched successfully',
        data: foundPerformance,
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
    data: Partial<UpdatePerformanceDto>,
    others: UpdateQuery<Performance> & Partial<Performance> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Performance | null>> {
    try {
      // const foundPerformance = await findOne(PerformanceModel, queries);
      // if (!foundPerformance) {
      //   throw {
      //     message: 'Performance not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedPerformance = await PerformanceModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedPerformance) {
        throw {
          message: 'Performance not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Performance updated successfully',
        data: updatedPerformance,
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
  ): Promise<serviceResponseType<DeletedResultType<Performance | null>>> {
    try {
      const deletedPerformance = await PerformanceModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedPerformance) {
        throw {
          message: 'Performance not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Performance deleted successfully',
        data: deletedPerformance,
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
