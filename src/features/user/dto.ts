import { IsOptional } from 'class-validator';
import {
  Certificate,
  Certification,
  Education,
  Experience,
  Qualification,
  User,
} from '../../models/userModel';

export class CreateUserDto implements Partial<User> {
  // export class CreateUserDto implements Partial<User> {
}
export class UpdateUserDto
  implements
    Omit<
      Required<User>,
      | 'createdBy'
      | 'type'
      | 'gradeForPosition1'
      | 'gradeForPosition2'
      | 'lastLogin'
      | 'emailVerified'
      | 'isAdmin'
      | 'permissions'
      | 'generateJWT'
      | 'status'
      | 'roles'
      | 'toJSON'
      | 'email'
      | 'employeeId'
      | 'level'
      | 'department'
      | 'position'
      | 'grade'
      | 'probationPeriod'
      | 'company'
    >
{
  @IsOptional()
  accountNumber: string;
  @IsOptional()
  accountName: string;
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsOptional()
  personalEmail: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  address: string;
  @IsOptional()
  lgaOfOrigin: string;
  @IsOptional()
  stateOfOrigin: string;
  @IsOptional()
  stateOfResidence: string;
  @IsOptional()
  country: string;
  @IsOptional()
  zip: string;
  @IsOptional()
  gender: string;
  @IsOptional()
  maritalStatus: string;
  @IsOptional()
  weddingAnniversary: Date;
  @IsOptional()
  weddingAnniversaryMonth: string;
  @IsOptional()
  weddingAnniversaryDay: string;
  @IsOptional()
  dateOfBirth: Date;
  @IsOptional()
  birthMonth: string;
  @IsOptional()
  birthDay: string;
  @IsOptional()
  pension: string;
  @IsOptional()
  pensionNumber: string;
  @IsOptional()
  onHMOScheme: boolean;
  @IsOptional()
  hmoProvider: string;
  @IsOptional()
  hmoNumber: string;
  @IsOptional()
  hmoId: string;
  @IsOptional()
  hmoPlan: string;
  @IsOptional()
  hmoHospital: string;
  @IsOptional()
  hmoStatus: string;
  @IsOptional()
  education: Education[];
  @IsOptional()
  experience: Experience[];
  @IsOptional()
  qualifications: Qualification[];
  @IsOptional()
  certifications: Certification[];
  @IsOptional()
  certificates: Certificate[];
}
