import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  assignmentId: number;

  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @IsString()
  startTime: string; // "09:00"

  @IsString()
  endTime: string; // "10:20"

  @IsOptional()
  @IsString()
  room?: string;
}
