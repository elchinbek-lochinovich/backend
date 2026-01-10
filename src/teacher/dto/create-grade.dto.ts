import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateGradeDto {
  @IsInt()
  assignmentId: number;

  @IsInt()
  studentUserId: number;

  @IsString()
  kind: string; // "quiz" | "midterm" | ...

  @IsNumber()
  @Min(0)
  score: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxScore?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
