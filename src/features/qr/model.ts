import {
  prop,
  getModelForClass,
  plugin,
  pre,
  modelOptions,
  Ref,
  DocumentType,
} from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import mongoose, { FilterQuery } from 'mongoose';
// import * as findorcreate from 'mongoose-findorcreate';
const findOrCreate = require('mongoose-findorcreate');

/**
 * Result for the `findOrCreate` function from mongoose-findorcreate
 */
export interface FindOrCreateResult<T> {
  created: boolean;
  doc: DocumentType<T>;
}

/**
 * This class contains all types for the module "mongoose-findorcreate", adjusted for typegoose
 */
@plugin(findOrCreate)
export abstract class FindOrCreate {
  public static findOrCreate: <T extends FindOrCreate>(
    this: mongoose.Model<T>,
    condition: FilterQuery<T>,
    createWith?: any,
  ) => Promise<FindOrCreateResult<T>>;
}
import { User } from '../../models/userModel';
import { Company } from '../company/model';

enum Type {
  CHECK_IN = 'check-in',
  CHECK_OUT = 'check-out',
}

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
@plugin(mongooseIdValidator)
@pre<Qr>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Qr extends FindOrCreate {
  @prop({ ref: () => User })
  public user!: Ref<User>;

  @prop({ enum: Type })
  public purpose: string;

  @prop({ required: true })
  public code!: string;

  @prop({ required: true })
  // data uri
  public uri!: string;

  @prop()
  public codeExpiresAt!: Date;

  @prop({ required: true, immutable: true, ref: () => Company })
  public company!: Ref<Company>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}

export const QrModel = getModelForClass(Qr);
