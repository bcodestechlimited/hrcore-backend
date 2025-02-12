import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateVoucherCompaniesDto, UpdateVoucherCompaniesDto } from './dto';
import { VoucherCompanies } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { VoucherCompaniesModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class VoucherCompaniesService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundVoucherCompaniess;
      if (conditions) {
        foundVoucherCompaniess = await find(VoucherCompaniesModel, queries, conditions);
      }
      else {
      foundVoucherCompaniess = await find(VoucherCompaniesModel, queries);
      }
      return {
        success: true,
        message: 'Voucher Companiess fetched successfully',
        data: foundVoucherCompaniess,
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
    payload: CreateVoucherCompaniesDto,
    data: Partial<VoucherCompanies> = {},
  ): Promise<serviceResponseType<VoucherCompanies>> {
    // return await VoucherCompaniesModel.create(data);
    validateDTO(CreateVoucherCompaniesDto, payload);
    try {
      const createdVoucherCompanies = await VoucherCompaniesModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Voucher Companies created successfully',
        data: createdVoucherCompanies,
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
      let foundVoucherCompanies;
      if (conditions) {
        foundVoucherCompanies = await findOne(VoucherCompaniesModel, queries, conditions);
      }
      else {
      foundVoucherCompanies = await findOne(VoucherCompaniesModel, queries);
      }
      return {
        success: true,
        message: 'Voucher Companies fetched successfully',
        data: foundVoucherCompanies,
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
    data: Partial< UpdateVoucherCompaniesDto>,
    others: UpdateQuery<VoucherCompanies> & Partial<VoucherCompanies> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<VoucherCompanies | null>> {
    try {
      // const foundVoucherCompanies = await findOne(VoucherCompaniesModel, queries);
      // if (!foundVoucherCompanies) {
      //   throw {
      //     message: 'Voucher Companies not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedVoucherCompanies = await VoucherCompaniesModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedVoucherCompanies) {
        throw {
          message: 'Voucher Companies not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher Companies updated successfully',
        data: updatedVoucherCompanies,
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
  ): Promise<serviceResponseType<DeletedResultType<VoucherCompanies | null>>> {
    try {
      const deletedVoucherCompanies = await VoucherCompaniesModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedVoucherCompanies) {
        throw {
          message: 'Voucher Companies not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher Companies deleted successfully',
        data: deletedVoucherCompanies,
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
