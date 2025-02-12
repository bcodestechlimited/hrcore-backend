import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';


// Status enum
export enum ResignationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
}

@plugin(mongooseIdValidator)
@pre<Resignation>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Resignation {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop()
  public exitCorrespondence!: string;

  @prop()
  public exitReason!: string;

  @prop()
  public exitDate!: Date;

  @prop()
  public dateEmployed!: Date;

  @prop()
  public companySecond!: string;

  @prop()
  public haveOutstandingObligation!: boolean;

  @prop()
  public theOutstanding!: string;

  @prop()
  public payOutStanding!: string;

  @prop()
  public repaymentPlan!: string;

  @prop()
  public haveOutstandingIssue!: boolean;

  @prop()
  public theOutstandingIssue!: string;

  @prop()
  public resolutionPlan!: string;

  @prop()
  public haveCompanyProperty!: boolean;



  @prop()
  public lastWorkingDate!: Date;

  @prop()
  public noticePeriod!: number;

  @prop()
  public reason!: string;

  @prop()
  public toolsReturned!: boolean;

  @prop()
  public currentAddress!: string;

  @prop()
  public personalEmail!: string;

  @prop()
  public personalPhone!: string;

  @prop()
  public remarks!: string;

  @prop()
  public letter!: string;

  @prop()
  public clearanceForm!: string;

  @prop()
  public exitInterview!: string;

  @prop()
  public noDueForm!: string;

  @prop()
  public experienceLetter!: string;

  @prop()
  public relievingLetter!: string;

  @prop()
  public salarySettlement!: string;

  //TODO: Add status enum
  @prop({default: 'Pending'})
  public status!: ResignationStatus;

  @prop()
  public cancellationReason!: string;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
