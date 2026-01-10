import { IsInt, IsOptional } from 'class-validator';

export class AssignTeacherDepartmentDto {
  @IsOptional()
  @IsInt()
  departmentId?: number;
}
