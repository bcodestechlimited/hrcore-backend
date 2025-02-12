import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceAccountDto, UpdateInvoiceAccountDto } from './dto';
import { InvoiceAccount } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceAccountModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceAccountService {
  /**
   * Fetches InvoiceAccounts from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the InvoiceAccounts by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of InvoiceAccounts that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<InvoiceAccount>>> {
    try {
      let foundInvoiceAccounts: QueryReturn<InvoiceAccount>;
      if (conditions) {
        foundInvoiceAccounts = await find(
          InvoiceAccountModel,
          queries,
          conditions,
        );
      } else {
        foundInvoiceAccounts = await find(InvoiceAccountModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceAccounts fetched successfully',
        data: foundInvoiceAccounts,
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
    payload: CreateInvoiceAccountDto,
    data: Partial<InvoiceAccount> = {},
  ): Promise<serviceResponseType<InvoiceAccount>> {
    // return await InvoiceAccountModel.create(data);
    validateDTO(CreateInvoiceAccountDto, payload);
    try {
      const createdInvoiceAccount = await InvoiceAccountModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'InvoiceAccount created successfully',
        data: createdInvoiceAccount,
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
  ): Promise<serviceResponseType<InvoiceAccount>> {
    try {
      let foundInvoiceAccount;
      if (conditions) {
        foundInvoiceAccount = await findOne(
          InvoiceAccountModel,
          queries,
          conditions,
        );
      } else {
        foundInvoiceAccount = await findOne(InvoiceAccountModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceAccount fetched successfully',
        data: foundInvoiceAccount,
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
    data: UpdateInvoiceAccountDto,
    others: UpdateQuery<InvoiceAccount> & Partial<InvoiceAccount> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceAccount | null>> {
    try {
      // const foundInvoiceAccount = await findOne(InvoiceAccountModel, queries);
      // if (!foundInvoiceAccount) {
      //   throw {
      //     message: 'InvoiceAccount not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceAccount = await InvoiceAccountModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceAccount) {
        throw {
          message: 'InvoiceAccount not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceAccount updated successfully',
        data: updatedInvoiceAccount,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceAccount | null>>> {
    try {
      const deletedInvoiceAccount = await InvoiceAccountModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceAccount) {
        throw {
          message: 'InvoiceAccount not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceAccount deleted successfully',
        data: deletedInvoiceAccount,
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
