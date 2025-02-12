import { IsOptional } from 'class-validator';
import { ApprovalFlow } from './model';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';
import { Company } from '../company/model';
import { Position } from '../position/model';
import { Flow } from '../flow/model';

export class CreateApprovalFlowDto implements ApprovalFlow {
    @IsOptional()
    public flow: Ref<Flow>;
    public createdBy: Ref<User>;
    @IsOptional()
    public position: Ref<Position>;
    @IsOptional()
    public approvers: number[];
    @IsOptional()
    public description?: string | undefined;
    public company: Ref<Company>;
// export class CreateApprovalFlowDto implements Partial<ApprovalFlow> {
}
export class UpdateApprovalFlowDto implements Partial<ApprovalFlow> {
//export class UpdateApprovalFlowDto implements Partial<ApprovalFlow> {

}
