import { IsOptional } from 'class-validator';
import { Form } from './schema';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';

export class CreateFormDto implements Form {
    @IsOptional()
    public name?: string;
    @IsOptional()
    public description?: string;
    public createdBy?: Ref<User>;
// export class CreateFormDto implements Partial<Form> {
}
export class UpdateFormDto implements Partial<Form> {
//export class UpdateFormDto implements Partial<Form> {

}
