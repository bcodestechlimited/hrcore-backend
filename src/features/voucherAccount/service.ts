import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateVoucherAccountDto, UpdateVoucherAccountDto } from './dto';
import { VoucherAccount } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { VoucherAccountModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class VoucherAccountService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundVoucherAccounts;
      if (conditions) {
        foundVoucherAccounts = await find(
          VoucherAccountModel,
          queries,
          conditions,
        );
      } else {
        foundVoucherAccounts = await find(VoucherAccountModel, queries);
      }
      return {
        success: true,
        message: 'Voucher Accounts fetched successfully',
        data: foundVoucherAccounts,
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
    payload: CreateVoucherAccountDto,
    data: Partial<VoucherAccount> = {},
  ): Promise<serviceResponseType<VoucherAccount>> {
    // return await VoucherAccountModel.create(data);
    validateDTO(CreateVoucherAccountDto, payload);
    try {
      const createdVoucherAccount = await VoucherAccountModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Voucher Account created successfully',
        data: createdVoucherAccount,
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
      let foundVoucherAccount;
      if (conditions) {
        foundVoucherAccount = await findOne(
          VoucherAccountModel,
          queries,
          conditions,
        );
      } else {
        foundVoucherAccount = await findOne(VoucherAccountModel, queries);
      }
      return {
        success: true,
        message: 'Voucher Account fetched successfully',
        data: foundVoucherAccount,
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
    data: Partial<UpdateVoucherAccountDto>,
    others: UpdateQuery<VoucherAccount> & Partial<VoucherAccount> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<VoucherAccount | null>> {
    try {
      // const foundVoucherAccount = await findOne(VoucherAccountModel, queries);
      // if (!foundVoucherAccount) {
      //   throw {
      //     message: 'Voucher Account not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedVoucherAccount = await VoucherAccountModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedVoucherAccount) {
        throw {
          message: 'Voucher Account not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher Account updated successfully',
        data: updatedVoucherAccount,
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
  ): Promise<serviceResponseType<DeletedResultType<VoucherAccount | null>>> {
    try {
      const deletedVoucherAccount = await VoucherAccountModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedVoucherAccount) {
        throw {
          message: 'Voucher Account not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher Account deleted successfully',
        data: deletedVoucherAccount,
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
