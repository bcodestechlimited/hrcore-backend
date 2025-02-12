import { IsOptional } from 'class-validator';
import { LeaveFlow } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Department } from '../department/model';
import { Company } from '../company/model';
import { Level } from '../level/model';

export class CreateLeaveFlowDto implements LeaveFlow {
  public createdBy: Ref<User>;
  @IsOptional()
  public level: Ref<Level>;
  @IsOptional()
  public approvers: Ref<Level>[];
  public company: Ref<Company>;

  // export class CreateLeaveFlowDto implements Partial<LeaveFlow> {
}
export class UpdateLeaveFlowDto implements Partial<LeaveFlow> {
  //export class UpdateLeaveFlowDto implements Partial<LeaveFlow> {
}
