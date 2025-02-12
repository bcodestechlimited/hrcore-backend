import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceEmailDto, UpdateInvoiceEmailDto } from './dto';
import { InvoiceEmail } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceEmailModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceEmailService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundInvoiceEmails;
      if (conditions) {
        foundInvoiceEmails = await find(InvoiceEmailModel, queries, conditions);
      } else {
        foundInvoiceEmails = await find(InvoiceEmailModel, queries);
      }
      return {
        success: true,
        message: 'Invoice Emails fetched successfully',
        data: foundInvoiceEmails,
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
    payload: CreateInvoiceEmailDto,
    data: Partial<InvoiceEmail> = {},
  ): Promise<serviceResponseType<InvoiceEmail>> {
    // return await InvoiceEmailModel.create(data);
    validateDTO(CreateInvoiceEmailDto, payload);
    try {
      const createdInvoiceEmail = await InvoiceEmailModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Invoice Email created successfully',
        data: createdInvoiceEmail,
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
      let foundInvoiceEmail;
      if (conditions) {
        foundInvoiceEmail = await findOne(
          InvoiceEmailModel,
          queries,
          conditions,
        );
      } else {
        foundInvoiceEmail = await findOne(InvoiceEmailModel, queries);
      }
      return {
        success: true,
        message: 'Invoice Email fetched successfully',
        data: foundInvoiceEmail,
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
    data: Partial<UpdateInvoiceEmailDto>,
    others: UpdateQuery<InvoiceEmail> & Partial<InvoiceEmail> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceEmail | null>> {
    try {
      // const foundInvoiceEmail = await findOne(InvoiceEmailModel, queries);
      // if (!foundInvoiceEmail) {
      //   throw {
      //     message: 'Invoice Email not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceEmail = await InvoiceEmailModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceEmail) {
        throw {
          message: 'Invoice Email not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice Email updated successfully',
        data: updatedInvoiceEmail,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceEmail | null>>> {
    try {
      const deletedInvoiceEmail = await InvoiceEmailModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceEmail) {
        throw {
          message: 'Invoice Email not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice Email deleted successfully',
        data: deletedInvoiceEmail,
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
