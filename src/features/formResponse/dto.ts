import { IsOptional } from 'class-validator';
import { Answers, FormResponse } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Form } from '../form/schema';

export class CreateFormResponseDto implements FormResponse {
    @IsOptional()
    public form: Ref<Form>;
    @IsOptional()
    public answers: Answers[];
    public createdBy: Ref<User>;
// export class CreateFormResponseDto implements Partial<FormResponse> {
}
export class UpdateFormResponseDto implements Partial<FormResponse> {
//export class UpdateFormResponseDto implements Partial<FormResponse> {

}
