import { IsOptional } from 'class-validator';
import { Job, JobLevel, JobStatus, JobType } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';
import { Company } from '../company/model';

export class CreateJobDto implements Job {
  @IsOptional()
  public type: JobType;
  @IsOptional()
  public level: JobLevel;
  @IsOptional()
  public status: JobStatus;
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public location: string;
  @IsOptional()
  public limit: string;
  @IsOptional()
  public hiringManager: string;
  @IsOptional()
  public recruiters: string[];
  public createdBy: Ref<User>;
  public form: Ref<Form>;
  public company: Ref<Company>;

  // export class CreateJobDto implements Partial<Job> {
}
export class UpdateJobDto implements Partial<Job> {
  //export class UpdateJobDto implements Partial<Job> {
}
