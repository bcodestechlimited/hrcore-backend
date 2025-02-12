import { Document, QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFormDto, UpdateFormDto } from './dto';
import { Form } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FormModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class FormService {
  /**
   * Fetches Forms from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Forms by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Forms that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Form>>> {
    try {
      let foundForms: QueryReturn<Form>;
      if (conditions) {
        foundForms = await find(FormModel, queries, conditions);
      } else {
        foundForms = await find(FormModel, queries);
      }
      return {
        success: true,
        message: 'Forms fetched successfully',
        data: foundForms,
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
    payload: CreateFormDto,
    data: Partial<Form> = {},
  ): Promise<serviceResponseType<Form & Document>> {
    // return await FormModel.create(data);
    // validateDTO(CreateFormDto, payload);
    try {
      const createdForm = await FormModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Form created successfully',
        data: createdForm,
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
  ): Promise<serviceResponseType<Form>> {
    try {
      let foundForm;
      if (conditions) {
        foundForm = await findOne(FormModel, queries, conditions);
      } else {
        foundForm = await findOne(FormModel, queries);
      }
      return {
        success: true,
        message: 'Form fetched successfully',
        data: foundForm,
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
    data: UpdateFormDto,
    others: UpdateQuery<Form> & Partial<Form> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Form | null>> {
    try {
      // const foundForm = await findOne(FormModel, queries);
      // if (!foundForm) {
      //   throw {
      //     message: 'Form not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedForm = await FormModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedForm) {
        throw {
          message: 'Form not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Form updated successfully',
        data: updatedForm,
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
  ): Promise<serviceResponseType<DeletedResultType<Form | null>>> {
    try {
      // const foundForm = await findOne(FormModel, queries, {
      //   _id: id,
      // });
      // if (!foundForm) {
      //   throw {
      //     message: 'Form not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedForm = await FormModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedForm) {
        throw {
          message: 'Form not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Form deleted successfully',
        data: deletedForm,
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
