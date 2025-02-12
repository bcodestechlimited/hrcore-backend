import { QueryOptions } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateToolDto, UpdateToolDto } from './dto';
import { Tool, ToolModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';

export default class ToolService {
  /**
   * Fetches Tools from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Tools by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Tools that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Tool>>> {
    try {
      let foundTools: QueryReturn<Tool>;
      if (conditions) {
        foundTools = await find(ToolModel, queries, conditions);
      }
      foundTools = await find(ToolModel, queries);
      return {
        success: true,
        message: 'Tools fetched successfully',
        data: foundTools,
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
    payload: CreateToolDto,
    data: Partial<Tool> = {},
  ): Promise<serviceResponseType<Tool>> {
    // return await ToolModel.create(data);
    validateDTO(CreateToolDto, payload);
    try {
      const createdTool = await ToolModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Tool created successfully',
        data: createdTool,
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
  ): Promise<serviceResponseType<Tool>> {
    try {
      let foundTool;
      if (conditions) {
        foundTool = await findOne(ToolModel, queries, conditions);
      }
      foundTool = await findOne(ToolModel, queries);
      return {
        success: true,
        message: 'Tool fetched successfully',
        data: foundTool,
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
    data: UpdateToolDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Tool | null>> {
    try {
      const foundTool = await findOne(ToolModel, queries);
      if (!foundTool) {
        throw {
          message: 'Tool not found or access denied',
          statusCode: 404,
        };
      }
      const updatedTool = await ToolModel.findByIdAndUpdate(
        foundTool._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Tool updated successfully',
        data: updatedTool,
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
  ): Promise<serviceResponseType<Tool | null>> {
    try {
      const foundTool = await findOne(ToolModel, queries, {
        _id: id,
      });
      if (!foundTool) {
        throw {
          message: 'Tool not found or access denied',
          statusCode: 404,
        };
      }
      const deletedTool = await ToolModel.findByIdAndDelete(
        foundTool._id,
      );

      return {
        success: true,
        message: 'Tool deleted successfully',
        data: deletedTool,
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
