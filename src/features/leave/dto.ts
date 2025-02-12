import { IsOptional } from 'class-validator';
import { Leave } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { LeaveType } from '../leaveType/model';

export class CreateLeaveDto implements Leave {
  public createdBy: Ref<User>;
  public leaveType: Ref<LeaveType>;
  public startDate: Date;
  public endDate: Date;
  public reason: string;
  public reliever: Ref<User>;
  // export class CreateLeaveDto implements Partial<Leave> {
}
export class UpdateLeaveDto implements Partial<Leave> {
  //export class UpdateLeaveDto implements Partial<Leave> {
}
