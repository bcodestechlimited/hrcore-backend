import { IsArray, IsOptional } from 'class-validator';
import { Announcement } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Company } from '../company/model';
import { File } from '../file/schema';
import { Department } from '../department/model';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const doc: IDocs = {};

export class CreateAnnouncementDto
  implements Omit<Required<Announcement>, 'createdBy' | 'company'>
{
  @IsOptional()

  public departments: Ref<Department>[];
  @IsOptional()
  public title: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public files: Ref<File>[];
}



export class sendMailDto {
  @IsNotEmpty()
  @IsString()
  public subject: string;

  @IsArray()
  @IsEmail({}, { each: true })
  public emails: string[];

  @IsNotEmpty()
  @IsString()
  public message: string;
}

doc['/sendmail'] = {
  POST: {
    schema: sendMailDto.name,
  },
};

doc['/'] = {
  POST: {
    schema: CreateAnnouncementDto.name,
  },
};

export class UpdateAnnouncementDto implements Omit<CreateAnnouncementDto, ''> {
  @IsOptional()

  public departments: Ref<Department>[];
  @IsOptional()
  public description: string;
  @IsOptional()
  public title: string;
  @IsOptional()
  public files: Ref<File>[];
}

doc['/:id'] = {
  PUT: {
    schema: UpdateAnnouncementDto.name,
  },
};

export const docs = doc;
