import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
