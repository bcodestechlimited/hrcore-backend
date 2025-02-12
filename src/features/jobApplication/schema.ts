import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Job } from '../job/schema';
import { Company } from '../company/model';

export enum JobApplicationStatus {
  'Newly applied' = 'Newly applied',
  'Shortlisted' = 'Shortlisted',
  'Interview' = 'Interview',
  'Health Check' = 'Health Check',
  'Background check' = 'Background check',
}

@plugin(mongooseIdValidator)
@pre<JobApplication>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class JobApplication {
  @prop({
    required: true,
  })
  public name!: string;

  @prop({
    required: true,
  })
  public email!: string;

  @prop({})
  public phone!: string;

  @prop({})
  public coverLetter!: string;

  @prop({})
  public resume!: string;

  @prop({})
  relocate!: boolean;

  @prop({})
  public consentBackgroundCheck!: boolean;

  @prop({})
  public startDate!: Date;

  @prop({})
  public expectedSalary!: number;

  @prop({})
  public noticePeriod!: number;

  @prop({
    enum: JobApplicationStatus,
    default: 'Newly applied',
  })
  public status!: JobApplicationStatus;

  // @prop({
  //   ref: () => Response,
  // })
  // public responses!: Ref<Response>;

  @prop({ ref: () => Job, required: true })
  public job!: Ref<Job>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // @prop({ required: true, immutable: true, ref: () => User })
  // public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
