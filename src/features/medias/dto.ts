import { IsOptional } from 'class-validator';
import { Medias } from './schema';

export class CreateMediasDto implements Omit<Medias, 'createdBy' | 'company'> {
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public url: string;
  // export class CreateMediasDto implements Partial<Medias> {
}
export class UpdateMediasDto implements Partial<Medias> {
  //export class UpdateMediasDto implements Partial<Medias> {
}
