import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceCodeDto, UpdateInvoiceCodeDto } from './dto';
import { InvoiceCode } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceCodeModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceCodeService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundInvoiceCodes;
      if (conditions) {
        foundInvoiceCodes = await find(InvoiceCodeModel, queries, conditions);
      } else {
        foundInvoiceCodes = await find(InvoiceCodeModel, queries);
      }
      return {
        success: true,
        message: 'Invoice Codes fetched successfully',
        data: foundInvoiceCodes,
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
    payload: CreateInvoiceCodeDto,
    data: Partial<InvoiceCode> = {},
  ): Promise<serviceResponseType<InvoiceCode>> {
    // return await InvoiceCodeModel.create(data);
    validateDTO(CreateInvoiceCodeDto, payload);
    try {
      const createdInvoiceCode = await InvoiceCodeModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Invoice Code created successfully',
        data: createdInvoiceCode,
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
      let foundInvoiceCode;
      if (conditions) {
        foundInvoiceCode = await findOne(InvoiceCodeModel, queries, conditions);
      } else {
        foundInvoiceCode = await findOne(InvoiceCodeModel, queries);
      }
      return {
        success: true,
        message: 'Invoice Code fetched successfully',
        data: foundInvoiceCode,
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
    data: Partial<UpdateInvoiceCodeDto>,
    others: UpdateQuery<InvoiceCode> & Partial<InvoiceCode> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceCode | null>> {
    try {
      // const foundInvoiceCode = await findOne(InvoiceCodeModel, queries);
      // if (!foundInvoiceCode) {
      //   throw {
      //     message: 'Invoice Code not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceCode = await InvoiceCodeModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceCode) {
        throw {
          message: 'Invoice Code not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice Code updated successfully',
        data: updatedInvoiceCode,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceCode | null>>> {
    try {
      const deletedInvoiceCode = await InvoiceCodeModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceCode) {
        throw {
          message: 'Invoice Code not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice Code deleted successfully',
        data: deletedInvoiceCode,
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
