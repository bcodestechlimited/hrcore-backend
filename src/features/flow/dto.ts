import { IsOptional } from 'class-validator';
import { Flow } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';


export class CreateFlowDto implements Flow {
    public createdBy: Ref<User>;
    @IsOptional()
    public name: string;
    @IsOptional()
    public description?: string | undefined;
    public company: Ref<Company>;
// export class CreateFlowDto implements Partial<Flow> {
}
export class UpdateFlowDto implements Partial<Flow> {
//export class UpdateFlowDto implements Partial<Flow> {

}
