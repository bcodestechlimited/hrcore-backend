import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceItemDto, UpdateInvoiceItemDto } from './dto';
import { InvoiceItem } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceItemModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceItemService {
  /**
   * Fetches InvoiceItems from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the InvoiceItems by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of InvoiceItems that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<InvoiceItem>>> {
    try {
      let foundInvoiceItems: QueryReturn<InvoiceItem>;
      if (conditions) {
        foundInvoiceItems = await find(InvoiceItemModel, queries, conditions);
      }
      else {
      foundInvoiceItems = await find(InvoiceItemModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceItems fetched successfully',
        data: foundInvoiceItems,
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
    payload: CreateInvoiceItemDto,
    data: Partial<InvoiceItem> = {},
  ): Promise<serviceResponseType<InvoiceItem>> {
    // return await InvoiceItemModel.create(data);
    validateDTO(CreateInvoiceItemDto, payload);
    try {
      const createdInvoiceItem = await InvoiceItemModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'InvoiceItem created successfully',
        data: createdInvoiceItem,
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
  ): Promise<serviceResponseType<InvoiceItem>> {
    try {
      let foundInvoiceItem;
      if (conditions) {
        foundInvoiceItem = await findOne(InvoiceItemModel, queries, conditions);
      }
      else {
      foundInvoiceItem = await findOne(InvoiceItemModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceItem fetched successfully',
        data: foundInvoiceItem,
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
    data: UpdateInvoiceItemDto,
    others: UpdateQuery<InvoiceItem> & Partial<InvoiceItem> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceItem | null>> {
    try {
      // const foundInvoiceItem = await findOne(InvoiceItemModel, queries);
      // if (!foundInvoiceItem) {
      //   throw {
      //     message: 'InvoiceItem not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceItem = await InvoiceItemModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceItem) {
        throw {
          message: 'InvoiceItem not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceItem updated successfully',
        data: updatedInvoiceItem,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceItem | null>>> {
    try {
      const deletedInvoiceItem = await InvoiceItemModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceItem) {
        throw {
          message: 'InvoiceItem not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceItem deleted successfully',
        data: deletedInvoiceItem,
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
