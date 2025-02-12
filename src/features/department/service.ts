import { QueryOptions } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { Department } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { DepartmentModel } from '../../models';

export default class DepartmentService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundDepartments;
      if (conditions) {
        foundDepartments = await find(DepartmentModel, queries, conditions);
      }
      foundDepartments = await find(DepartmentModel, queries);
      return {
        success: true,
        message: 'Departments fetched successfully',
        data: foundDepartments,
        statusCode: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async create(
    payload: CreateDepartmentDto,
    data: Partial<Department> = {},
  ): Promise<serviceResponseType> {
    // return await DepartmentModel.create(data);
    validateDTO(CreateDepartmentDto, payload);
    try {
      const createdDepartment = await DepartmentModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Department created successfully',
        data: createdDepartment,
        statusCode: 201,
      };
    } catch (error) {
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
      let foundDepartment;
      if (conditions) {
        foundDepartment = await findOne(DepartmentModel, queries, conditions);
      }
      foundDepartment = await findOne(DepartmentModel, queries);
      return {
        success: true,
        message: 'Department fetched successfully',
        data: foundDepartment,
        statusCode: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async updateOne(
    queries: { [key: string]: any; _id: string },
    data: UpdateDepartmentDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundDepartment = await findOne(DepartmentModel, queries);
      if (!foundDepartment) {
        throw {
          message: 'Department not found or access denied',
          statusCode: 404,
        };
      }
      const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
        foundDepartment._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Department updated successfully',
        data: updatedDepartment,
        statusCode: 200,
      };
    } catch (error) {
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
      const foundDepartment = await findOne(DepartmentModel, queries, {
        _id: id,
      });
      if (!foundDepartment) {
        throw {
          message: 'Department not found or access denied',
          statusCode: 404,
        };
      }
      const deletedDepartment = await DepartmentModel.findByIdAndDelete(
        foundDepartment._id,
      );

      return {
        success: true,
        message: 'Department deleted successfully',
        data: deletedDepartment,
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
