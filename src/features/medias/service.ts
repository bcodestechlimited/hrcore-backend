import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateMediasDto, UpdateMediasDto } from './dto';
import { Medias } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { MediasModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class MediasService {
  /**
   * Fetches Mediass from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Mediass by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Mediass that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Medias>>> {
    try {
      let foundMediass: QueryReturn<Medias>;
      if (conditions) {
        foundMediass = await find(MediasModel, queries, conditions);
      }
      else {
      foundMediass = await find(MediasModel, queries);
      }
      return {
        success: true,
        message: 'Mediass fetched successfully',
        data: foundMediass,
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
    payload: CreateMediasDto,
    data: Partial<Medias> = {},
  ): Promise<serviceResponseType<Medias>> {
    // return await MediasModel.create(data);
    validateDTO(CreateMediasDto, payload);
    try {
      const createdMedias = await MediasModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Medias created successfully',
        data: createdMedias,
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
  ): Promise<serviceResponseType<Medias>> {
    try {
      let foundMedias;
      if (conditions) {
        foundMedias = await findOne(MediasModel, queries, conditions);
      }
      else {
      foundMedias = await findOne(MediasModel, queries);
      }
      return {
        success: true,
        message: 'Medias fetched successfully',
        data: foundMedias,
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
    data: UpdateMediasDto,
    others: UpdateQuery<Medias> & Partial<Medias> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Medias | null>> {
    try {
      // const foundMedias = await findOne(MediasModel, queries);
      // if (!foundMedias) {
      //   throw {
      //     message: 'Medias not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedMedias = await MediasModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedMedias) {
        throw {
          message: 'Medias not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Medias updated successfully',
        data: updatedMedias,
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
  ): Promise<serviceResponseType<DeletedResultType<Medias | null>>> {
    try {
      const deletedMedias = await MediasModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedMedias) {
        throw {
          message: 'Medias not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Medias deleted successfully',
        data: deletedMedias,
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
