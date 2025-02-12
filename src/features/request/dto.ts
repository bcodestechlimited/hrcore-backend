import { IsOptional } from 'class-validator';
import { Request } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';

export class CreateRequestDto implements Omit<Request, 'company'> {
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
  public createdBy: Ref<User>;
  // export class CreateRequestDto implements Partial<Request> {
}
export class UpdateRequestDto implements Partial<Request> {
  //export class UpdateRequestDto implements Partial<Request> {
}
