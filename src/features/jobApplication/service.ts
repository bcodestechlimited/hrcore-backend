import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto';
import { JobApplication } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { JobApplicationModel } from '../../models';
import mailService from '../../services/mailService';
import { DeletedResultType } from '../../utilities/templates/types';

export default class JobApplicationService {
  /**
   * Fetches JobApplications from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the JobApplications by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of JobApplications that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<JobApplication>>> {
    try {
      let foundJobApplications: QueryReturn<JobApplication>;
      if (conditions) {
        foundJobApplications = await find(
          JobApplicationModel,
          queries,
          conditions,
        );
      } else {
        foundJobApplications = await find(JobApplicationModel, queries);
      }
      return {
        success: true,
        message: 'JobApplications fetched successfully',
        data: foundJobApplications,
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
    payload: CreateJobApplicationDto,
    data: Partial<JobApplication> = {},
  ): Promise<serviceResponseType<JobApplication>> {
    // return await JobApplicationModel.create(data);
    console.log('payload', payload, 'data in job application');
    validateDTO(CreateJobApplicationDto, payload);
    try {
      const createdJobApplication = await JobApplicationModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'JobApplication created successfully',
        data: createdJobApplication,
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
  ): Promise<serviceResponseType<JobApplication>> {
    try {
      let foundJobApplication;
      if (conditions) {
        foundJobApplication = await findOne(
          JobApplicationModel,
          queries,
          conditions,
        );
      } else {
        foundJobApplication = await findOne(JobApplicationModel, queries);
      }

      return {
        success: true,
        message: 'JobApplication fetched successfully',
        data: foundJobApplication,
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
    data: UpdateJobApplicationDto,
    others: UpdateQuery<JobApplication> & Partial<JobApplication> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<JobApplication | null>> {
    try {
      // const foundJobApplication = await findOne(JobApplicationModel, queries);
      // if (!foundJobApplication) {
      //   throw {
      //     message: 'JobApplication not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedJobApplication = await JobApplicationModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedJobApplication) {
        throw {
          message: 'JobApplication not found or access denied',
          statusCode: 404,
        };
      }

      if (data.status || others.status) {
        await mailService(
          `Application Status Changed`,
          `${updatedJobApplication.email}`,
          `
Hello ${updatedJobApplication.name}, your application status has been changed to ${updatedJobApplication.status}
Expect more updates about your application.
Thanks
          `,
        );
      }
      return {
        success: true,
        message: 'JobApplication updated successfully',
        data: updatedJobApplication,
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
  ): Promise<serviceResponseType<DeletedResultType<JobApplication | null>>> {
    try {
      const deletedJobApplication = await JobApplicationModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedJobApplication) {
        throw {
          message: 'JobApplication not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'JobApplication deleted successfully',
        data: deletedJobApplication,
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
