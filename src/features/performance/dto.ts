import { IsOptional } from 'class-validator';
import { Performance, PerformanceSection } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Department } from '../department/model';
import { Position } from '../position/model';

const doc: IDocs = {};

export class CreatePerformanceDto
  implements Omit<Required<Performance>, 'createdBy' | 'company'>
{
  @IsOptional()
  public sections: PerformanceSection[];
  @IsOptional()
  public active: boolean;

  @IsOptional()
  public name: string;

  @IsOptional()
  public reviewPeriod: string;
  @IsOptional()
  public department: Ref<Department>;
  @IsOptional()
  position: Ref<Position>;
}

doc['/'] = {
  POST: {
    schema: CreatePerformanceDto.name,
  },
};

export class UpdatePerformanceDto implements Omit<CreatePerformanceDto, ''> {
  @IsOptional()
  public sections: PerformanceSection[];
  @IsOptional()
  public active: boolean;
  @IsOptional()
  public name: string;
  @IsOptional()
  public reviewPeriod: string;
  @IsOptional()
  public department: Ref<Department>;
  @IsOptional()
  position: Ref<Position>;
}

doc['/:id'] = {
  PUT: {
    schema: UpdatePerformanceDto.name,
  },
};

export const docs = doc;
