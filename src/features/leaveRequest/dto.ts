import { IsOptional } from 'class-validator';
import { LeaveRequest, LeaveRequestStatus } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { LeaveType } from '../leaveType/model';

export class CreateLeaveRequestDto implements LeaveRequest {
  @IsOptional()
  public approvers: Ref<User>[];
  public createdBy: Ref<User>;
  @IsOptional()
  public leaveType: Ref<LeaveType>;
  @IsOptional()
  public startDate?: Date | undefined;
  @IsOptional()
  public endDate?: Date | undefined;
  @IsOptional()
  public justification?: string | undefined;
  @IsOptional()
  public reliever: Ref<User>;
  public company: Ref<Company>;
  // export class CreateLeaveRequestDto implements Partial<LeaveRequest> {
}
export class UpdateLeaveRequestDto implements Partial<LeaveRequest> {
  //export class UpdateLeaveRequestDto implements Partial<LeaveRequest> {
}

export class ReviewDTO implements Partial<LeaveRequest> {
  @IsOptional()
  public status: LeaveRequestStatus;
}
