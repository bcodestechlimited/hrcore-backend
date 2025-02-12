import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateGradeDto, UpdateGradeDto } from './dto';
import { Grade } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { GradeModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class GradeService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundGrades;
      if (conditions) {
        foundGrades = await find(GradeModel, queries, conditions);
      }
      else {
      foundGrades = await find(GradeModel, queries);
      }
      return {
        success: true,
        message: 'Grades fetched successfully',
        data: foundGrades,
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
    payload: CreateGradeDto,
    data: Partial<Grade> = {},
  ): Promise<serviceResponseType<Grade>> {
    // return await GradeModel.create(data);
    validateDTO(CreateGradeDto, payload);
    try {
      const createdGrade = await GradeModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Grade created successfully',
        data: createdGrade,
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
      let foundGrade;
      if (conditions) {
        foundGrade = await findOne(GradeModel, queries, conditions);
      }
      else {
      foundGrade = await findOne(GradeModel, queries);
      }
      return {
        success: true,
        message: 'Grade fetched successfully',
        data: foundGrade,
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
    data: Partial< UpdateGradeDto>,
    others: UpdateQuery<Grade> & Partial<Grade> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Grade | null>> {
    try {
      // const foundGrade = await findOne(GradeModel, queries);
      // if (!foundGrade) {
      //   throw {
      //     message: 'Grade not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedGrade = await GradeModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedGrade) {
        throw {
          message: 'Grade not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Grade updated successfully',
        data: updatedGrade,
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
  ): Promise<serviceResponseType<DeletedResultType<Grade | null>>> {
    try {
      const deletedGrade = await GradeModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedGrade) {
        throw {
          message: 'Grade not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Grade deleted successfully',
        data: deletedGrade,
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
