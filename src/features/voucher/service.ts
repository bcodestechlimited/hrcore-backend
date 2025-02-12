import { QueryOptions, Types, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateVoucherDto, UpdateVoucherDto } from './dto';
import { Voucher } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { VoucherModel } from '../../models';
import CompanyService from '../company/service';
import { DeletedResultType } from '../../utilities/templates/types';

export default class VoucherService {
  static _Model = VoucherModel;
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundVouchers;
      if (conditions) {
        foundVouchers = await find(VoucherModel, queries, conditions);
      } else {
        foundVouchers = await find(VoucherModel, queries);
      }
      return {
        success: true,
        message: 'Vouchers fetched successfully',
        data: foundVouchers,
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

  static async getUniqueVoucherNumbers(number: number): Promise<string> {
    // number = await VoucherModel.countDocuments();
    const numberString = `${number}`.padStart(5, '0');
    const voucherExists = await VoucherModel.findOne({ number: numberString });
    if (voucherExists) {
      return this.getUniqueVoucherNumbers(number + 1);
    }
    return numberString;
  }

  static async regenerateVooucherNumbers() {
    const vouchers = await VoucherModel.find();
    console.log('vouchers', vouchers.length);
    // find all voucher with duplicate numbers
    let duplicateVouchers = await VoucherModel.aggregate([
      {
        $group: {
          _id: '$number',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);
    console.log('duplicateVouchers', duplicateVouchers);
    for (let i = 0; i < vouchers.length; i++) {
      const voucher = vouchers[i];
      const numberString = `${i}`.padStart(5, '0');
      console.log('numberString', numberString);
      await VoucherModel.findByIdAndUpdate(
        voucher._id,
        {
          number: numberString,
        },
        { strict: false },
      );
    }
    duplicateVouchers = await VoucherModel.aggregate([
      {
        $group: {
          _id: '$number',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);
    console.log('duplicateVouchers', duplicateVouchers);
    console.log('done');
  }

  static async create(
    payload: CreateVoucherDto,
    data: Partial<Voucher> = {},
  ): Promise<serviceResponseType<Voucher>> {
    // return await VoucherModel.create(data);
    validateDTO(CreateVoucherDto, payload);
    try {
      const number = await VoucherModel.countDocuments();
      const numberString = await this.getUniqueVoucherNumbers(number);
      // const numberString = `${number}`.padStart(5, '0');
      console.log('numberString', numberString);
      const createdVoucher = await VoucherModel.create({
        ...payload,
        ...data,
        number: numberString,
      });
      // await CompanyService.sendEmailToMangersAndExecutives(
      //   createdVoucher.company as Types.ObjectId,
      //   `A new voucher has been created`,
      //   `A new voucher has been created with the following details:
      //   Voucher Number: ${createdVoucher.number}
      //   Amount: ${createdVoucher.amount}

      //   Please login to your account to view the voucher.
        
      //   `,
      // );
      return {
        success: true,
        message: 'Voucher created successfully',
        data: createdVoucher,
        statusCode: 201,
      };
      // send email to Company ED and MD
    } catch (error) {
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
      let foundVoucher;
      if (conditions) {
        foundVoucher = await findOne(VoucherModel, queries, conditions);
      } else {
        foundVoucher = await findOne(VoucherModel, queries);
      }
      return {
        success: true,
        message: 'Voucher fetched successfully',
        data: foundVoucher,
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
    data: Partial<UpdateVoucherDto> & {
      updatedBy: Types.ObjectId;
    },
    others: UpdateQuery<Voucher> & Partial<Voucher> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Voucher | null>> {
    try {
      // const foundVoucher = await findOne(VoucherModel, queries);
      // if (!foundVoucher) {
      //   throw {
      //     message: 'Voucher not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedVoucher = await VoucherModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedVoucher) {
        throw {
          message: 'Voucher not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher updated successfully',
        data: updatedVoucher,
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
  ): Promise<serviceResponseType<DeletedResultType<Voucher | null>>> {
    try {
      const deletedVoucher = await VoucherModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedVoucher) {
        throw {
          message: 'Voucher not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Voucher deleted successfully',
        data: deletedVoucher,
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

// VoucherService.regenerateVooucherNumbers();
