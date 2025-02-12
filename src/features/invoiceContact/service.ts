import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateInvoiceContactDto, UpdateInvoiceContactDto } from './dto';
import { InvoiceContact } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { InvoiceContactModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class InvoiceContactService {
  /**
   * Fetches InvoiceContacts from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the InvoiceContacts by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of InvoiceContacts that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<InvoiceContact>>> {
    try {
      let foundInvoiceContacts: QueryReturn<InvoiceContact>;
      if (conditions) {
        foundInvoiceContacts = await find(InvoiceContactModel, queries, conditions);
      }
      else {
      foundInvoiceContacts = await find(InvoiceContactModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceContacts fetched successfully',
        data: foundInvoiceContacts,
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
    payload: CreateInvoiceContactDto,
    data: Partial<InvoiceContact> = {},
  ): Promise<serviceResponseType<InvoiceContact>> {
    // return await InvoiceContactModel.create(data);
    validateDTO(CreateInvoiceContactDto, payload);
    try {
      const createdInvoiceContact = await InvoiceContactModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'InvoiceContact created successfully',
        data: createdInvoiceContact,
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
  ): Promise<serviceResponseType<InvoiceContact>> {
    try {
      let foundInvoiceContact;
      if (conditions) {
        foundInvoiceContact = await findOne(InvoiceContactModel, queries, conditions);
      }
      else {
      foundInvoiceContact = await findOne(InvoiceContactModel, queries);
      }
      return {
        success: true,
        message: 'InvoiceContact fetched successfully',
        data: foundInvoiceContact,
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
    data: UpdateInvoiceContactDto,
    others: UpdateQuery<InvoiceContact> & Partial<InvoiceContact> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<InvoiceContact | null>> {
    try {
      // const foundInvoiceContact = await findOne(InvoiceContactModel, queries);
      // if (!foundInvoiceContact) {
      //   throw {
      //     message: 'InvoiceContact not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedInvoiceContact = await InvoiceContactModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedInvoiceContact) {
        throw {
          message: 'InvoiceContact not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceContact updated successfully',
        data: updatedInvoiceContact,
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
  ): Promise<serviceResponseType<DeletedResultType<InvoiceContact | null>>> {
    try {
      const deletedInvoiceContact = await InvoiceContactModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedInvoiceContact) {
        throw {
          message: 'InvoiceContact not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'InvoiceContact deleted successfully',
        data: deletedInvoiceContact,
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
