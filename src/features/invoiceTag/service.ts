import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceTagDto, UpdateInvoiceTagDto } from './dto';
import { InvoiceTag } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceTagModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceTagService {
  /**
   * Fetches InvoiceTags from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the InvoiceTags by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of InvoiceTags that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<InvoiceTag>>> {
    try {
      let foundInvoiceTags: QueryReturn<InvoiceTag>;
      if (conditions) {
        foundInvoiceTags = await find(InvoiceTagModel, queries, conditions);
      }
      else {
      foundInvoiceTags = await find(InvoiceTagModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceTags fetched successfully',
        data: foundInvoiceTags,
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
    payload: CreateInvoiceTagDto,
    data: Partial<InvoiceTag> = {},
  ): Promise<serviceResponseType<InvoiceTag>> {
    // return await InvoiceTagModel.create(data);
    validateDTO(CreateInvoiceTagDto, payload);
    try {
      const createdInvoiceTag = await InvoiceTagModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'InvoiceTag created successfully',
        data: createdInvoiceTag,
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
  ): Promise<serviceResponseType<InvoiceTag>> {
    try {
      let foundInvoiceTag;
      if (conditions) {
        foundInvoiceTag = await findOne(InvoiceTagModel, queries, conditions);
      }
      else {
      foundInvoiceTag = await findOne(InvoiceTagModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceTag fetched successfully',
        data: foundInvoiceTag,
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
    data: UpdateInvoiceTagDto,
    others: UpdateQuery<InvoiceTag> & Partial<InvoiceTag> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceTag | null>> {
    try {
      // const foundInvoiceTag = await findOne(InvoiceTagModel, queries);
      // if (!foundInvoiceTag) {
      //   throw {
      //     message: 'InvoiceTag not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceTag = await InvoiceTagModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceTag) {
        throw {
          message: 'InvoiceTag not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceTag updated successfully',
        data: updatedInvoiceTag,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceTag | null>>> {
    try {
      const deletedInvoiceTag = await InvoiceTagModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceTag) {
        throw {
          message: 'InvoiceTag not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceTag deleted successfully',
        data: deletedInvoiceTag,
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
