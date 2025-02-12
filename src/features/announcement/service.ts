import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { Announcement } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { AnnouncementModel } from '../../models';
import { DeletedResultType } from '../../utilities/templates/types';

export default class AnnouncementService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundAnnouncements;
      if (conditions) {
        foundAnnouncements = await find(AnnouncementModel, queries, conditions);
      } else {
        foundAnnouncements = await find(AnnouncementModel, queries);
      }
      return {
        success: true,
        message: 'Announcements fetched successfully',
        data: foundAnnouncements,
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
    payload: CreateAnnouncementDto,
    data: Partial<Announcement> = {},
  ): Promise<serviceResponseType<Announcement>> {
    // return await AnnouncementModel.create(data);
    validateDTO(CreateAnnouncementDto, payload);
    try {
      const createdAnnouncement = await AnnouncementModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Announcement created successfully',
        data: createdAnnouncement,
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
      let foundAnnouncement;
      if (conditions) {
        foundAnnouncement = await findOne(
          AnnouncementModel,
          queries,
          conditions,
        );
      } else {
        foundAnnouncement = await findOne(AnnouncementModel, queries);
      }
      return {
        success: true,
        message: 'Announcement fetched successfully',
        data: foundAnnouncement,
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
    data: Partial<UpdateAnnouncementDto>,
    others: UpdateQuery<Announcement> & Partial<Announcement> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Announcement | null>> {
    try {
      // const foundAnnouncement = await findOne(AnnouncementModel, queries);
      // if (!foundAnnouncement) {
      //   throw {
      //     message: 'Announcement not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedAnnouncement = await AnnouncementModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedAnnouncement) {
        throw {
          message: 'Announcement not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Announcement updated successfully',
        data: updatedAnnouncement,
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
  ): Promise<serviceResponseType<DeletedResultType<Announcement> | null>> {
    try {
      const deletedAnnouncement = await AnnouncementModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedAnnouncement) {
        throw {
          message: 'Announcement not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Announcement deleted successfully',
        data: deletedAnnouncement,
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
