import { IsOptional } from 'class-validator';
import { Department } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateDepartmentDto implements Department {
    @IsOptional()
    public modules: string[];
    public company: Ref<Company>;
    @IsOptional()
    public name: string;
    @IsOptional()
    public description: string;
    public createdBy: Ref<User>;
// export class CreateDepartmentDto implements Partial<Department> {
}
export class UpdateDepartmentDto implements Partial<Department> {
//export class UpdateDepartmentDto implements Partial<Department> {

}
