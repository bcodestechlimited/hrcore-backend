import { QueryOptions, Types, UpdateQuery } from 'mongoose';
import { find, findOne } from '../../utilities/query';
import { CreateUserDto, UpdateUserDto } from './dto';
import UserModel, { User } from '../../models/userModel';
import { serviceResponseType } from '../../utilities/response';

export default class UserService {

  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ) {
    if (conditions) {
      return await find(UserModel, queries, conditions);
    }
    return await find(UserModel, queries);
  }



  static async create(data: CreateUserDto) {
    return await UserModel.create(data);
  }

  static async fetchOne(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ) {
    if (conditions) {
      return await findOne(UserModel, queries, conditions);
    }
    return await findOne(UserModel, queries);
  }

  static async updateOne(
    queries: { [key: string]: any; _id: string | Types.ObjectId },
    // data: UpdateUserDto,
    data: UpdateQuery<Required<User>>,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    let updatedUser = await UserModel.findByIdAndUpdate(
      queries._id,
      data,
      options,
    ).orFail()

 

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
      statusCode: 200,
    };
  }

  static async updateUser(
    queries: { [key: string]: any; _id: string | Types.ObjectId },
    // data: UpdateUserDto,
    data: UpdateQuery<Required<User>>,
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType> {
    let updatedUser = await UserModel.findByIdAndUpdate(
      queries._id,
      data,
      options,
    );

   

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
      statusCode: 200,
    };
  }

  static async deleteOne(id: string, queries: { [key: string]: any }) {
    const foundUser = await findOne(UserModel, queries, {
      _id: id,
    });
    if (!foundUser) {
      throw new Error('User not found or access denied');
    }
    const deletedUser = await UserModel.findByIdAndDelete(foundUser._id);
    return deletedUser;
  }
}
