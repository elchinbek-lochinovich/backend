import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @IsInt()
  departmentId: number;

  @IsString()
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(1)
  @Max(6)
  course: number;

  @IsOptional()
  @IsInt()
  year?: number;
}
