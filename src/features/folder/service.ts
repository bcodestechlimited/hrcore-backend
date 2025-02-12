import { QueryOptions } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFolderDto, UpdateFolderDto } from './dto';
import { Folder, FolderModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class FolderService {
  /**
   * Fetches Folders from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Folders by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Folders that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Folder>>> {
    try {
      let foundFolders: QueryReturn<Folder>;
      if (conditions) {
        foundFolders = await find(FolderModel, queries, conditions);
      }
      foundFolders = await find(FolderModel, queries);
      return {
        success: true,
        message: 'Folders fetched successfully',
        data: foundFolders,
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
    payload: CreateFolderDto,
    data: Partial<Folder> = {},
  ): Promise<serviceResponseType<Folder>> {
    // return await FolderModel.create(data);
    validateDTO(CreateFolderDto, payload);
    try {
      const createdFolder = await FolderModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Folder created successfully',
        data: createdFolder,
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
  ): Promise<serviceResponseType<Folder>> {
    try {
      let foundFolder;
      if (conditions) {
        foundFolder = await findOne(FolderModel, queries, conditions);
      }
      foundFolder = await findOne(FolderModel, queries);
      return {
        success: true,
        message: 'Folder fetched successfully',
        data: foundFolder,
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
    data: UpdateFolderDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Folder | null>> {
    try {
      const foundFolder = await findOne(FolderModel, queries);
      if (!foundFolder) {
        throw {
          message: 'Folder not found or access denied',
          statusCode: 404,
        };
      }
      const updatedFolder = await FolderModel.findByIdAndUpdate(
        foundFolder._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Folder updated successfully',
        data: updatedFolder,
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
  ): Promise<serviceResponseType<Folder | null>> {
    try {
      const foundFolder = await findOne(FolderModel, queries, {
        _id: id,
      });
      if (!foundFolder) {
        throw {
          message: 'Folder not found or access denied',
          statusCode: 404,
        };
      }
      const deletedFolder = await FolderModel.findByIdAndDelete(
        foundFolder._id,
      );

      return {
        success: true,
        message: 'Folder deleted successfully',
        data: deletedFolder,
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
