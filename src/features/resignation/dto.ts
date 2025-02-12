import { IsOptional } from 'class-validator';
import { Resignation, ResignationStatus } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateResignationDto implements Resignation {
  @IsOptional()
  public exitCorrespondence: string;
  @IsOptional()
  public exitReason: string;
  @IsOptional()
  public exitDate: Date;
  @IsOptional()
  public dateEmployed: Date;
  @IsOptional()
  public companySecond: string;
  @IsOptional()
  public haveOutstandingObligation: boolean;
  @IsOptional()
  public theOutstanding: string;
  @IsOptional()
  public payOutStanding: string;
  @IsOptional()
  public repaymentPlan: string;
  @IsOptional()
  public haveOutstandingIssue: boolean;
  @IsOptional()
  public theOutstandingIssue: string;
  @IsOptional()
  public resolutionPlan: string;
  @IsOptional()
  public haveCompanyProperty: boolean;
  @IsOptional()
  public status: ResignationStatus;
  @IsOptional()
  public cancellationReason: string;
  public createdBy: Ref<User>;
  @IsOptional()
  public lastWorkingDate: Date;
  @IsOptional()
  public noticePeriod: number;
  @IsOptional()
  public reason: string;
  @IsOptional()
  public toolsReturned: boolean;
  @IsOptional()
  public currentAddress: string;
  @IsOptional()
  public personalEmail: string;
  @IsOptional()
  public personalPhone: string;
  @IsOptional()
  public remarks: string;
  @IsOptional()
  public letter: string;
  @IsOptional()
  public clearanceForm: string;
  @IsOptional()
  public exitInterview: string;
  @IsOptional()
  public noDueForm: string;
  @IsOptional()
  public experienceLetter: string;
  @IsOptional()
  public relievingLetter: string;
  @IsOptional()
  public salarySettlement: string;
  public company: Ref<Company>;
  // export class CreateResignationDto implements Partial<Resignation> {
}
export class UpdateResignationDto implements Partial<Resignation> {
  //export class UpdateResignationDto implements Partial<Resignation> {
}

// export const UpdateResignationDto = CreateResignationDto;
