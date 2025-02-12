import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFormQuestionDto, UpdateFormQuestionDto } from './dto';
import { FormQuestion } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FormQuestionModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class FormQuestionService {
  /**
   * Fetches FormQuestions from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the FormQuestions by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of FormQuestions that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<FormQuestion>>> {
    try {
      let foundFormQuestions: QueryReturn<FormQuestion>;
      if (conditions) {
        foundFormQuestions = await find(FormQuestionModel, queries, conditions);
      }
      else {
      foundFormQuestions = await find(FormQuestionModel, queries);
      }
      return {
        success: true,
        message: 'FormQuestions fetched successfully',
        data: foundFormQuestions,
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
    payload: CreateFormQuestionDto,
    data: Partial<FormQuestion> = {},
  ): Promise<serviceResponseType<FormQuestion>> {
    // return await FormQuestionModel.create(data);
    validateDTO(CreateFormQuestionDto, payload);
    try {
      const createdFormQuestion = await FormQuestionModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'FormQuestion created successfully',
        data: createdFormQuestion,
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
  ): Promise<serviceResponseType<FormQuestion>> {
    try {
      let foundFormQuestion;
      if (conditions) {
        foundFormQuestion = await findOne(FormQuestionModel, queries, conditions);
      }
      else {
      foundFormQuestion = await findOne(FormQuestionModel, queries);
      }
      return {
        success: true,
        message: 'FormQuestion fetched successfully',
        data: foundFormQuestion,
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
    data: UpdateFormQuestionDto,
    others: UpdateQuery<FormQuestion> & Partial<FormQuestion> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FormQuestion | null>> {
    try {
      // const foundFormQuestion = await findOne(FormQuestionModel, queries);
      // if (!foundFormQuestion) {
      //   throw {
      //     message: 'FormQuestion not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedFormQuestion = await FormQuestionModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedFormQuestion) {
        throw {
          message: 'FormQuestion not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FormQuestion updated successfully',
        data: updatedFormQuestion,
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
  ): Promise<serviceResponseType<DeletedResultType<FormQuestion | null>>> {
    try {
      const deletedFormQuestion = await FormQuestionModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedFormQuestion) {
        throw {
          message: 'FormQuestion not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FormQuestion deleted successfully',
        data: deletedFormQuestion,
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
