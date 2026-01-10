import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  subjectId: number;

  @IsInt()
  groupId: number;

  @IsInt()
  teacherUserId: number;

  @IsOptional()
  @IsInt()
  academicYear?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2)
  semester?: number;
}
