import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { Position } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { PositionModel } from '../../models';

export default class PositionService {
 
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundPositions;
      if (conditions) {
        foundPositions = await find(PositionModel, queries, conditions);
      }
      foundPositions = await find(PositionModel, queries);
      return {
        success: true,
        message: 'Positions fetched successfully',
        data: foundPositions,
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
    payload: CreatePositionDto,
    data: Partial<Position> = {},
  ): Promise<serviceResponseType> {
    // return await PositionModel.create(data);
    validateDTO(CreatePositionDto, payload);
    try {
      const createdPosition = await PositionModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Position created successfully',
        data: createdPosition,
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
      let foundPosition;
      if (conditions) {
        foundPosition = await findOne(PositionModel, queries, conditions);
      }
      foundPosition = await findOne(PositionModel, queries);
      return {
        success: true,
        message: 'Position fetched successfully',
        data: foundPosition,
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
    data: UpdatePositionDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundPosition = await findOne(PositionModel, queries);
      if (!foundPosition) {
        throw {
          message: 'Position not found or access denied',
          statusCode: 404,
        };
      }
      const updatedPosition = await PositionModel.findByIdAndUpdate(
        foundPosition._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Position updated successfully',
        data: updatedPosition,
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
      const foundPosition = await findOne(PositionModel, queries, {
        _id: id,
      });
      if (!foundPosition) {
        throw {
          message: 'Position not found or access denied',
          statusCode: 404,
        };
      }
      const deletedPosition = await PositionModel.findByIdAndDelete(
        foundPosition._id,
      );

      return {
        success: true,
        message: 'Position deleted successfully',
        data: deletedPosition,
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
