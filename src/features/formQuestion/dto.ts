import { IsOptional } from 'class-validator';
import { FormQuestion, FormQuestionType } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';

export class CreateFormQuestionDto implements FormQuestion {
  @IsOptional()
  public name: string;
  @IsOptional()
  public description: string;
  @IsOptional()
  public type: FormQuestionType;
  @IsOptional()
  public options: string[];
  @IsOptional()
  public required: boolean;
  @IsOptional()
  public order: number;
  @IsOptional()
  public form: Ref<Form>;
  public createdBy: Ref<User>;
  // export class CreateFormQuestionDto implements Partial<FormQuestion> {
}
export class UpdateFormQuestionDto implements Partial<FormQuestion> {
  //export class UpdateFormQuestionDto implements Partial<FormQuestion> {
}
