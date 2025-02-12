import { IsOptional } from 'class-validator';
import { RequestForm } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { LeaveRequestStatus } from '../leaveRequest/model';
import { Request } from '../request/schema';

export class CreateRequestFormDto
  implements Omit<RequestForm, 'status' | 'createdBy' | 'company'>
{
  @IsOptional()
  public request: Ref<Request>;
  @IsOptional()
  public title: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public amount: number;
  @IsOptional()
  public startDate?: Date | undefined;
  @IsOptional()
  public endDate?: Date | undefined;
  @IsOptional()
  public justification?: string | undefined;
  @IsOptional()
  public reliever: Ref<User>;
  @IsOptional()
  public approvers: Ref<User>[];
  @IsOptional()
  public nextApprover?: Ref<User> | undefined;

  // export class CreateRequestFormDto implements Partial<RequestForm> {
}
export class UpdateRequestFormDto implements Partial<RequestForm> {
  //export class UpdateRequestFormDto implements Partial<RequestForm> {
}
