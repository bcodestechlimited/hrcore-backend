import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateJobDto, UpdateJobDto } from './dto';
import { Job } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { JobModel } from '../../models';
import FormService from '../form/service';
import { DeletedResultType } from '../../utilities/templates/types';

export default class JobService {
  /**
   * Fetches Jobs from the database based on the provided queries and conditions.
   * @param queries - The queries to filter the Jobs by.
   * @param conditions - The conditions to apply to the query (optional).
   * @returns A promise that resolves to an array of Jobs that match the provided queries and conditions.
   */
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType<QueryReturn<Job>>> {
    try {
      let foundJobs: QueryReturn<Job>;
      if (conditions) {
        foundJobs = await find(JobModel, queries, conditions);
      } else {
        foundJobs = await find(JobModel, queries);
      }
      return {
        success: true,
        message: 'Jobs fetched successfully',
        data: foundJobs,
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
    payload: CreateJobDto,
    data: Partial<Job> = {},
  ): Promise<serviceResponseType<Job>> {
    // return await JobModel.create(data);
    // console.log('payload', payload, CreateJobDto);
    validateDTO(CreateJobDto, payload);
    try {
      const createdJob = await JobModel.create({
        ...payload,
        ...data,
        form: (
          await FormService.create({
            // createdBy: payload.createdBy,
          })
        ).data._id,
      });
      return {
        success: true,
        message: 'Job created successfully',
        data: createdJob,
        statusCode: 201,
      };
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
  ): Promise<serviceResponseType<Job>> {
    try {
      let foundJob;
      if (conditions) {
        foundJob = await findOne(JobModel, queries, conditions);
      } else {
        foundJob = await findOne(JobModel, queries);
      }
      return {
        success: true,
        message: 'Job fetched successfully',
        data: foundJob,
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
    data: UpdateJobDto,
    others: UpdateQuery<Job> & Partial<Job> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Job | null>> {
    try {
      // const foundJob = await findOne(JobModel, queries);
      // if (!foundJob) {
      //   throw {
      //     message: 'Job not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedJob = await JobModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedJob) {
        throw {
          message: 'Job not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Job updated successfully',
        data: updatedJob,
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
  ): Promise<
    serviceResponseType<DeletedResultType<Job | null>>
  > {
    try {
      const deletedJob = await JobModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedJob) {
        throw {
          message: 'Job not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Job deleted successfully',
        data: deletedJob,
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
