import { IsOptional } from 'class-validator';
import { Tool } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';

export class CreateToolDto implements Tool {
    public users: Ref<User>[];
    public company: Ref<Company>;
    public createdBy: Ref<User>;
    @IsOptional()
    public name: string;
    @IsOptional()
    public description?: string | undefined;
    @IsOptional()
    public imageUri?: string | undefined;
    @IsOptional()
    public assetId?: string | undefined;
    @IsOptional()
    public details?: string | undefined;
// export class CreateToolDto implements Partial<Tool> {
}
export class UpdateToolDto implements Partial<Tool> {
//export class UpdateToolDto implements Partial<Tool> {

}
