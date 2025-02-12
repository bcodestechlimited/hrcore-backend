import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { File } from '../file/schema';
import { Department } from '../department/model';

@plugin(mongooseIdValidator)
@pre<Announcement>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Announcement {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  @prop({ required: true })
  public title!: string;

  @prop({})
  public description!: string;

  @prop({ ref: () => File })
  public files!: Ref<File>[];

  @prop({ref: () => Department})
  public departments!: Ref<Department>[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
