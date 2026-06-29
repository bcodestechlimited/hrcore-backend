import { FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { Company } from './model';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import mailService from '../../services/mailService';
import { Ref, isDocument } from '@typegoose/typegoose';
import { CompanyModel } from '../../models';
import { Position } from '../position/model';
import UserModel, { User } from '../../models/userModel';

export default class CompanyService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundCompanys: QueryReturn<Company>;
      if (conditions) {
        foundCompanys = await find(CompanyModel, queries, conditions);
      }
      foundCompanys = await find(CompanyModel, queries);
      return {
        success: true,
        message: 'Companys fetched successfully',
        data: foundCompanys,
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
    payload: CreateCompanyDto,
    data: Partial<Company> = {},
  ): Promise<serviceResponseType<Company>> {
    // return await CompanyModel.create(data);
    validateDTO(CreateCompanyDto, payload);
    try {
      const createdCompany = await CompanyModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Company created successfully',
        data: createdCompany,
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
  ): Promise<serviceResponseType> {
    try {
      let foundCompany;
      if (conditions) {
        foundCompany = await findOne(CompanyModel, queries, conditions);
      }
      foundCompany = await findOne(CompanyModel, queries);
      return {
        success: true,
        message: 'Company fetched successfully',
        data: foundCompany,
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

  static async updateOne(
    queries: { [key: string]: any; _id: string },
    payload: UpdateCompanyDto,
    others: UpdateQuery<Company> & Partial<Company> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    try {
      const foundCompany = await findOne(CompanyModel, queries);
      if (!foundCompany) {
        throw {
          message: 'Company not found or access denied',
          statusCode: 404,
        };
      }
      const updatedCompany = await CompanyModel.findByIdAndUpdate(
        foundCompany._id,
        {
          ...payload,
          ...others,
        },
        options,
      );
      return {
        success: true,
        message: 'Company updated successfully',
        data: updatedCompany,
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

  static async deleteOne(
    id: string,
    queries: { [key: string]: any },
  ): Promise<serviceResponseType> {
    try {
      const foundCompany = await findOne(CompanyModel, queries, {
        _id: id,
      });
      if (!foundCompany) {
        throw {
          message: 'Company not found or access denied',
          statusCode: 404,
        };
      }
      const deletedCompany = await CompanyModel.findByIdAndDelete(
        foundCompany._id,
      );

      return {
        success: true,
        message: 'Company deleted successfully',
        data: deletedCompany,
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

  // send email to manager and executives
  static async sendEmailToMangersAndExecutives(
    company: Types.ObjectId,
    subject: string,
    message: string,
  ): Promise<serviceResponseType> {
    try {
      const foundCompany = await CompanyModel.findById(company)
        .populate([
          {
            path: 'managers',
            select: 'email',
          },
          {
            path: 'executive',
            select: 'email',
          },
        ])
        .orFail();

      for (const manager of foundCompany.managers || []) {
        if (isDocument(manager)) {
          await mailService(subject, manager.email, message);
        } else {
          // console.warn('manager is not a document', manager);
        }
      }
      for (const executive of foundCompany.executive || []) {
        if (isDocument(executive)) {
          await mailService(subject, executive.email, message);
        } else {
          // console.warn('executive is not a document', executive);
        }
      }

      // send email to managers
      // send email to executives
      return {
        success: true,
        message: 'Email sent successfully',
        data: null,
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

  // send email to line manager1
  static async sendEmailToLineManager(
    company: Types.ObjectId,
    subject: string,
    message: string,
    queries: FilterQuery<User>,
  ): Promise<serviceResponseType> {
    try {
      const foundUsers = await UserModel.find({
        ...queries,
        company,
        // _id: company,
      }).orFail();
      for (const user of foundUsers) {
        await mailService(subject, user.email, message);
      }

      return {
        success: true,
        message: 'Email sent successfully',
        data: null,
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

  // send email to line manager2
  // static async sendEmailToLineManager2(
  //   company: Types.ObjectId,
  //   subject: string,
  //   message: string,
  //   position: Ref<Position> | undefined,
  //   queries: FilterQuery<Company> = {},
  // ): Promise<serviceResponseType> {
  //   try {
  //     const foundCompany = await CompanyModel.findOne({
  //       ...queries,
  //       _id: company,
  //     })
  //       .populate([
  //         {
  //           path: 'manager2s',
  //         },
  //       ])
  //       .orFail();

  //     for (const manager2 of foundCompany.manager2s || []) {
  //       if (isDocument(manager2)) {
  //         if (position) {
  //           if (
  //             manager2.gradeForPosition2?.toString() !== position.toString()
  //           ) {
  //             continue;
  //           }
  //         }
  //         await mailService(subject, manager2.email, message);
  //       } else {
  //         console.warn('manager2 is not a document', manager2);
  //       }
  //     }

  //     return {
  //       success: true,
  //       message: 'Email sent successfully',
  //       data: null,
  //       statusCode: 200,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error.message,
  //       data: error,
  //     };
  //   }
  // }

  static sendEMailToStaff = async (
    company: Types.ObjectId,
    subject: string,
    message: string,
    singleStaff: Types.ObjectId | undefined,
    queries: FilterQuery<Company> = {},
  ): Promise<serviceResponseType> => {
    try {
      const foundCompany = await CompanyModel.findOne({
        ...queries,
        _id: company,
      })
        .populate([
          {
            path: 'staffs',
            select: 'email',
          },
        ])
        .orFail();

      if (singleStaff) {
        const staff = foundCompany.staffs?.find(
          (staff) => staff._id.toString() === singleStaff.toString(),
        );
        if (isDocument(staff)) {
          await mailService(subject, staff.email, message);
        } else {
          // console.warn('staff is not a document', staff);
        }
        return {
          success: true,
          message: 'Email sent successfully',
          data: null,
          statusCode: 200,
        };
      }

      for (const staff of foundCompany.staffs || []) {
        if (isDocument(staff)) {
          await mailService(subject, staff.email, message);
        } else {
          // console.warn('staff is not a document', staff);
        }
      }

      return {
        success: true,
        message: 'Email sent successfully',
        data: null,
        statusCode: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  };
}
