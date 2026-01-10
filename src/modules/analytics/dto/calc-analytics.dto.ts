import { IsDateString, IsInt } from 'class-validator';

export class CalcAnalyticsDto {
  @IsInt()
  studentUserId: number;

  @IsDateString()
  fromDate: string; // "2025-12-01"

  @IsDateString()
  toDate: string;   // "2025-12-31"
}
