import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Department } from '../department/model';
import { Company } from '../company/model';
import { Performance } from '../performance/schema';
import { Position } from '../position/model';

export class KPI {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public weight!: number;

  @prop({ required: true })
  public selfScore!: number;

  @prop({ ref: () => User })
  public manager1!: Ref<User>;

  @prop({ ref: () => User })
  public manager2!: Ref<User>;

  @prop({})
  public manager1Score!: number;

  @prop({})
  public manager2Score!: number;

  @prop({ required: true })
  public weightedScore!: number;
}

export class PerformanceSection {
  @prop({ required: true })
  public name!: string;

  @prop({
    // refer to KPI
    type: () => KPI,
  })
  public kpis: KPI[];
}

@plugin(mongooseIdValidator)
@pre<PerformanceReview>('save', function (next) {
  this.record = this.performance + '-' + this.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class PerformanceReview {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: false, immutable: true, unique: true })
  public record!: string;

  @prop({ required: true, ref: () => Performance })
  public performance!: Ref<Performance>;

  @prop({ required: true })
  public sections: PerformanceSection[];

  @prop({ required: false })
  public remarks!: string;

  @prop({ required: false })
  manager1Remark: string;

  @prop({ required: false })
  staffRemarkForManager1: string;

  @prop({ required: false })
  manager2Remark: string;

  @prop({ required: false })
  staffRemarkForManager2: string;

  @prop({ required: false })
  lineManager1Recommendation?: string;

  @prop({ required: false })
  lineManager2Recommendation?: string;

  @prop({ required: true })
  public department!: Ref<Department>;

  @prop({ required: true, ref: () => Company })
  public company: Ref<Company>;

  @prop({ required: false, ref: () => Position })
  position: Ref<Position>;
}
