import { IsOptional } from 'class-validator';
import { Qr } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateQrDto implements Qr {
  public user: Ref<User>;
  public purpose: string;
  public code: string;
  public uri: string;
  public codeExpiresAt: Date;
  public company: Ref<Company>;


  // export class CreateQrDto implements Partial<Qr> {
}
export class UpdateQrDto implements Partial<Qr> {
  //export class UpdateQrDto implements Partial<Qr> {
}
