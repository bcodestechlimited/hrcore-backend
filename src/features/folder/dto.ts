import { IsOptional } from 'class-validator';
import { Folder } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Level } from '../level/model';
import { Company } from '../company/model';

export class CreateFolderDto implements Folder {
  public company: Ref<Company>;
  public createdBy: Ref<User>;
  @IsOptional()
  public name: string;
  @IsOptional()
  public description?: string | undefined;
  @IsOptional()
  public imageUri?: string | undefined;
  @IsOptional()
  public levels?: Ref<Level>[] | undefined;
  // export class CreateFolderDto implements Partial<Folder> {
}
export class UpdateFolderDto implements Partial<Folder> {
  //export class UpdateFolderDto implements Partial<Folder> {
}
