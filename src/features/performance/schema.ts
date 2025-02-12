import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Department } from '../department/model';
import { Company } from '../company/model';
import { Position } from '../position/model';

export class KPI {
  @prop({ required: false })
  public name!: string;

  @prop({ required: true })
  public weight!: number;
}

export class PerformanceSection {
  @prop({ required: false })
  public name!: string;

  @prop({
    // refer to KPI
    type: () => KPI,
  })
  public kpis: KPI[];
}

@plugin(mongooseIdValidator)
@pre<Performance>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Performance {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true, default: false })
  public active!: boolean;

  @prop({ required: false })
  public name!: string;

  @prop({ required: true })
  public reviewPeriod!: string;

  @prop({ required: false, ref: () => Position })
  position: Ref<Position>;

  @prop({ required: true, ref: () => Department })
  public department!: Ref<Department>;

  @prop({ required: true })
  public sections: PerformanceSection[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
