import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
