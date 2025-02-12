import { IsOptional } from 'class-validator';
import { Grade } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateGradeDto
  implements Omit<Required<Grade>, 'createdBy' | 'company'>
{
  @IsOptional()
  public noOfLeaveDays: number;
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
}

doc['/'] = {
  POST: {
    schema: CreateGradeDto.name,
  },
};

export class UpdateGradeDto implements Omit<CreateGradeDto, ''> {
  @IsOptional()
  public noOfLeaveDays: number;
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateGradeDto.name,
  },
};

export const docs = doc;
