import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';
import { Company } from '../company/model';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  VOLUNTEER = 'volunteer',
  TEMPORARY = 'temporary',
}

export enum JobLevel {
  ENTRY_LEVEL = 'entry-level',
  MID_LEVEL = 'mid-level',
  SENIOR_LEVEL = 'senior-level',
  GRADUATE = 'graduate',
}

export enum JobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

@plugin(mongooseIdValidator)
@pre<Job>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Job {
  @prop()
  public name!: string;

  @prop()
  public description!: string;

  @prop({
    // TODO: Type should be enum
    enum: JobType,
  })
  public type!: JobType;

  @prop()
  public location!: string;

  @prop()
  public limit!: string;

  @prop({
    // TODO: level should be enum
    enum: JobLevel,
  })
  public level!: JobLevel;

  @prop()
  public hiringManager!: string;

  @prop({
    type: [String],
  })
  recruiters!: string[];

  @prop({
    enum: JobStatus,
  })
  public status!: JobStatus;

  @prop({
    ref: () => Form,
    required: true,
  })
  public form!: Ref<Form>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
