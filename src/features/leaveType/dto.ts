import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LeaveType } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateLeaveTypeDto implements LeaveType {
  public company: Ref<Company>;
  public createdBy: Ref<User>;
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public days: number;
  // export class CreateLeaveTypeDto implements Partial<LeaveType> {
}
export class UpdateLeaveTypeDto implements Partial<LeaveType> {
  //export class UpdateLeaveTypeDto implements Partial<LeaveType> {
}
