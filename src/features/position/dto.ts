import { IsOptional } from 'class-validator';
import { Position } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { Department } from '../department/model';

export class CreatePositionDto implements Position {
    @IsOptional()
    public department: Ref<Department>;
    public createdBy: Ref<User>;
    @IsOptional()
    public name: string;
    @IsOptional()
    public description: string;
    public company: Ref<Company>;
// export class CreatePositionDto implements Partial<Position> {
}
export class UpdatePositionDto implements Partial<Position> {
//export class UpdatePositionDto implements Partial<Position> {

}
