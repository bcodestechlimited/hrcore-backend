import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateResignationDto, UpdateResignationDto } from './dto';
import { Resignation } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ResignationModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class ResignationService {
  /**
   * Fetches Resignations from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Resignations by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Resignations that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Resignation>>> {
    try {
      let foundResignations: QueryReturn<Resignation>;
      if (conditions) {
        foundResignations = await find(ResignationModel, queries, conditions);
      }
      foundResignations = await find(ResignationModel, queries);
      return {
        success: true,
        message: 'Resignations fetched successfully',
        data: foundResignations,
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
    payload: CreateResignationDto,
    data: Partial<Resignation> = {},
  ): Promise<serviceResponseType<Resignation>> {
    // return await ResignationModel.create(data);
    validateDTO(CreateResignationDto, payload);
    try {
      const createdResignation = await ResignationModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Resignation created successfully',
        data: createdResignation,
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
  ): Promise<serviceResponseType<Resignation>> {
    try {
      let foundResignation;
      if (conditions) {
        foundResignation = await findOne(ResignationModel, queries, conditions);
      }
      foundResignation = await findOne(ResignationModel, queries);
      return {
        success: true,
        message: 'Resignation fetched successfully',
        data: foundResignation,
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
    data: UpdateResignationDto,
    others: UpdateQuery<Resignation> & Partial<Resignation> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Resignation | null>> {
    try {
      // const foundResignation = await findOne(ResignationModel, queries);
      // if (!foundResignation) {
      //   throw {
      //     message: 'Resignation not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedResignation = await ResignationModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedResignation) {
        throw {
          message: 'Resignation not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Resignation updated successfully',
        data: updatedResignation,
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
  ): Promise<serviceResponseType<DeletedResultType<Resignation | null>>> {
    try {
      const deletedResignation = await ResignationModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedResignation) {
        throw {
          message: 'Resignation not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Resignation deleted successfully',
        data: deletedResignation,
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
