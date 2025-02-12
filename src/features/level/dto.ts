import { Level } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { LeaveType } from '../leaveType/model';
import { IsOptional } from 'class-validator';

export class CreateLevelDto implements Level {
    public createdBy: Ref<User>;
    @IsOptional()
    public name: string;
    @IsOptional()
    public leaveTypes: Ref<LeaveType>[];
    @IsOptional()
    public salary: number;
    public company: Ref<Company>;
// export class CreateLevelDto implements Partial<Level> {
}
export class UpdateLevelDto implements Partial<Level> {
//export class UpdateLevelDto implements Partial<Level> {

}
