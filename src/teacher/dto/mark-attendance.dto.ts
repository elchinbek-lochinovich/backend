import { AttendanceStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class MarkAttendanceDto {
  @IsInt()
  scheduleId: number;

  @IsInt()
  studentUserId: number;

  @IsDateString()
  date: string; // "2025-12-28" yoki "2025-12-28T00:00:00.000Z"

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsOptional()
  @IsString()
  note?: string;
}
