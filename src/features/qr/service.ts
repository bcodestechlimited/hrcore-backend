import { QueryOptions } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQrDto, UpdateQrDto } from './dto';
import { Qr, QrModel } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { createRandomLetters } from '../../utilities';
import { Types } from 'mongoose';
import QRCode from 'qrcode';

export default class QrService {
  /**
   * Fetches Qrs from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Qrs by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Qrs that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Qr>>> {
    try {
      let foundQrs: QueryReturn<Qr>;
      if (conditions) {
        foundQrs = await find(QrModel, queries, conditions);
      }
      foundQrs = await find(QrModel, queries);
      return {
        success: true,
        message: 'Qrs fetched successfully',
        data: foundQrs,
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

  // generate unique qrCode
  static async generateQrCode(): Promise<string> {
    const code = createRandomLetters(9);
    const foundQr = await QrModel.findOne({ code });
    if (foundQr) {
      return await this.generateQrCode();
    }
    return code;
  }

  static async deleteAllExpiredUnusedQrCodes(): Promise<void> {
    await QrModel.deleteMany({
      codeExpiresAt: {
        $lt: new Date(),
      },
      //user does not exist
      user: {
        $exists: false,
      },
    });
  }

  static async create(
    payload: CreateQrDto,
    data: Partial<Qr> = {},
  ): Promise<serviceResponseType<Qr>> {
    // return await QrModel.create(data);
    // validateDTO(CreateQrDto, payload);
    try {
      this.deleteAllExpiredUnusedQrCodes();
      // Find Qr for today
      const code = await this.generateQrCode();
      const uri = await QRCode.toDataURL(code, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',

        // quality: 1,
        margin: 1,
        width: 200,
        color: {
          dark: '#000000',
          light: '#0000',
        },
      });
      const foundQr = await QrModel.create({
        // ...payload,
        ...data,
        code,
        uri,
        // expires in 5 seconds
        codeExpiresAt: new Date(Date.now() + 5 * 1000),
      });
      return {
        success: true,
        message: 'Qr created successfully',
        data: foundQr,
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

  static async scanQrCode(
    code: string,
    user: Types.ObjectId,
  ): Promise<serviceResponseType<Qr | null>> {
    try {
      const foundQr = await QrModel.findOne({ code });
      if (!foundQr) {
        return {
          success: false,
          message: 'Qr code does not exist',
          statusCode: 404,
          data: null,
        };
      }
      if (foundQr.codeExpiresAt < new Date()) {
        return {
          success: false,
          message: 'Qr code has expired',
          statusCode: 400,
          data: null,
        };
      }
      if (foundQr.user) {
        return {
          success: false,
          message: 'Qr code has already been used',
          statusCode: 400,
          data: null,
        };
      }
      foundQr.user = user;
      let purpose = 'check-in';
      // check if the user signed in today already
      const today = new Date();
      // Check Qr for today that has been used by the user
      const foundQrToday = await QrModel.findOne({
        user,
        codeExpiresAt: {
          // $gte: today,
          // greater than or equal to today
          $gte: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ),
        },
      });
      if (foundQrToday) {
        purpose = 'check-out';
      }
      foundQr.purpose = purpose;
      await foundQr.save();
      return {
        success: true,
        message: `You have successfully ${purpose} for today`,
        data: foundQr,
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

  static async fetchOne(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<Qr>> {
    try {
      let foundQr;
      if (conditions) {
        foundQr = await findOne(QrModel, queries, conditions);
      }
      foundQr = await findOne(QrModel, queries);
      return {
        success: true,
        message: 'Qr fetched successfully',
        data: foundQr,
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
    data: UpdateQrDto,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Qr | null>> {
    try {
      const foundQr = await findOne(QrModel, queries);
      if (!foundQr) {
        throw {
          message: 'Qr not found or access denied',
          statusCode: 404,
        };
      }
      const updatedQr = await QrModel.findByIdAndUpdate(
        foundQr._id,
        data,
        options,
      );
      return {
        success: true,
        message: 'Qr updated successfully',
        data: updatedQr,
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
  ): Promise<serviceResponseType<Qr | null>> {
    try {
      const foundQr = await findOne(QrModel, queries, {
        _id: id,
      });
      if (!foundQr) {
        throw {
          message: 'Qr not found or access denied',
          statusCode: 404,
        };
      }
      const deletedQr = await QrModel.findByIdAndDelete(foundQr._id);

      return {
        success: true,
        message: 'Qr deleted successfully',
        data: deletedQr,
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
