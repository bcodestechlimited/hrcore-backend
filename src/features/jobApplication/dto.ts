import { IsOptional } from 'class-validator';
import { JobApplication, JobApplicationStatus } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { Job } from '../job/schema';

export class CreateJobApplicationDto implements Omit<JobApplication, 'status'> {
  @IsOptional()
  public name: string;
  @IsOptional()
  public email: string;
  @IsOptional()
  public phone: string;
  @IsOptional()
  public coverLetter: string;
  @IsOptional()
  public resume: string;
  @IsOptional()
  relocate: boolean;
  @IsOptional()
  public consentBackgroundCheck: boolean;
  @IsOptional()
  public startDate: Date;
  @IsOptional()
  public expectedSalary: number;
  @IsOptional()
  public noticePeriod: number;
  // @IsOptional()
  // public responses: Ref<Response>;
  @IsOptional()
  public job: Ref<Job>;
  @IsOptional()
  public company: Ref<Company>;
  // public createdBy: Ref<User>;

  // export class CreateJobApplicationDto implements Partial<JobApplication> {
}
export class UpdateJobApplicationDto implements JobApplication {
  public name: string;
  public email: string;
  public phone: string;
  public coverLetter: string;
  public resume: string;
  relocate: boolean;
  public consentBackgroundCheck: boolean;
  public startDate: Date;
  public expectedSalary: number;
  public noticePeriod: number;
  public status: JobApplicationStatus;
  public responses: Ref<Response>;
  public job: Ref<Job>;
  public company: Ref<Company>;
  //export class UpdateJobApplicationDto implements Partial<JobApplication> {
}
