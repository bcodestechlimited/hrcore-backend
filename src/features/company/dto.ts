import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Company } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Position } from '../position/model';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateCompanyDto
  implements
    Omit<
      Required<Company>,
      | 'staffs'
      | 'admins'
      | 'managers'
      | 'manager1s'
      | 'manager2s'
      | 'executive'
      | 'createdBy'
    >
{
  @IsNotEmpty()
  public website: string;
  @IsNotEmpty()
  public name: string;
  // export class CreateCompanyDto implements Partial<Company> {
}
export class UpdateCompanyDto implements Partial<Company> {
  //export class UpdateCompanyDto implements Partial<Company> {
  @IsOptional()
  @IsString()
  website?: string;
}

export class AddManagerDTO {
  @IsNotEmpty()
  @IsArray()
  gradeForPosition?: Ref<Position>[];
}

doc['/add/manager1/:id/:userId'] = {
  PUT: {
    schema: AddManagerDTO.name,
    description: `
    
    gradeForPosition: id of position

    

    `,
  },
};

export class RemoveManagerDTO {
  @IsNotEmpty()
  @IsArray()
  gradeForPosition?: Ref<Position>[];
}

doc['/remove/manager1/:id/:userId'] = {
  PUT: {
    schema: RemoveManagerDTO.name,
    description: `
    gradeForPosition: id of position
    UserId: 65d7590fd1faa45786590cd8 for 65d7590fd1faa45786590cd8
    `,
  },
};

doc['/add/manager2/:id/:userId'] = doc['/add/manager1/:id/:userId'];
doc['/remove/manager2/:id/:userId'] = doc['/remove/manager1/:id/:userId'];

export const docs = doc;
