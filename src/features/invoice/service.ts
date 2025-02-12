import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { Invoice } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Invoice>>> {
    try {
      let foundInvoices: QueryReturn<Invoice>;
      if (conditions) {
        foundInvoices = await find(InvoiceModel, queries, conditions);
      } else {
        foundInvoices = await find(InvoiceModel, queries);
      }
      return {
        success: true,
        message: 'Invoices fetched successfully',
        data: foundInvoices,
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
    payload: CreateInvoiceDto,
    data: Partial<Invoice> = {},
  ): Promise<serviceResponseType<Invoice>> {
    // return await InvoiceModel.create(data);
    validateDTO(CreateInvoiceDto, payload);
    try {
      const invoiceId = await InvoiceModel.countDocuments();
      const createdInvoice = await InvoiceModel.create({
        ...payload,
        ...data,
        invoiceId:
          // add year to invoiceId
          `${new Date().getFullYear()}/${invoiceId + 1}`,
      });
      return {
        success: true,
        message: 'Invoice created successfully',
        data: createdInvoice,
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
  ): Promise<serviceResponseType<Invoice>> {
    try {
      let foundInvoice;
      if (conditions) {
        foundInvoice = await findOne(InvoiceModel, queries, conditions);
      } else {
        foundInvoice = await findOne(InvoiceModel, queries);
      }
      return {
        success: true,
        message: 'Invoice fetched successfully',
        data: foundInvoice,
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
    data: UpdateInvoiceDto,
    others: UpdateQuery<Invoice> & Partial<Invoice> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Invoice | null>> {
    try {
      // const foundInvoice = await findOne(InvoiceModel, queries);
      // if (!foundInvoice) {
      //   throw {
      //     message: 'Invoice not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoice = await InvoiceModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoice) {
        throw {
          message: 'Invoice not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice updated successfully',
        data: updatedInvoice,
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
  ): Promise<serviceResponseType<DeletedResultType<Invoice | null>>> {
    try {
      const deletedInvoice = await InvoiceModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoice) {
        throw {
          message: 'Invoice not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Invoice deleted successfully',
        data: deletedInvoice,
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
