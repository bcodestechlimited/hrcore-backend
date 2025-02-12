import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateLevelDto, UpdateLevelDto } from './dto';
import { Level } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { LevelModel } from '../../models';

export default class LevelService {
  /**
   * Fetches Levels from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Levels by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Levels that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundLevels;
      if (conditions) {
        foundLevels = await find(LevelModel, queries, conditions);
      }
      foundLevels = await find(LevelModel, queries);
      return {
        success: true,
        message: 'Levels fetched successfully',
        data: foundLevels,
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
    payload: CreateLevelDto,
    data: Partial<Level> = {},
  ): Promise<serviceResponseType> {
    // return await LevelModel.create(data);
    validateDTO(CreateLevelDto, payload);
    try {
      const createdLevel = await LevelModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Level created successfully',
        data: createdLevel,
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
      let foundLevel;
      if (conditions) {
        foundLevel = await findOne(LevelModel, queries, conditions);
      }
      foundLevel = await findOne(LevelModel, queries);
      return {
        success: true,
        message: 'Level fetched successfully',
        data: foundLevel,
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
    data: UpdateLevelDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundLevel = await findOne(LevelModel, queries);
      if (!foundLevel) {
        throw {
          message: 'Level not found or access denied',
          statusCode: 404,
        };
      }
      const updatedLevel = await LevelModel.findByIdAndUpdate(
        foundLevel._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Level updated successfully',
        data: updatedLevel,
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
      const foundLevel = await findOne(LevelModel, queries, {
        _id: id,
      });
      if (!foundLevel) {
        throw {
          message: 'Level not found or access denied',
          statusCode: 404,
        };
      }
      const deletedLevel = await LevelModel.findByIdAndDelete(
        foundLevel._id,
      );

      return {
        success: true,
        message: 'Level deleted successfully',
        data: deletedLevel,
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
