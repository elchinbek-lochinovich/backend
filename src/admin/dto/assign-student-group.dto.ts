import { IsInt, IsOptional } from 'class-validator';

export class AssignStudentGroupDto {
  @IsOptional()
  @IsInt()
  groupId?: number;
}
