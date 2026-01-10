import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @MinLength(2)
  fullName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  // Eski data uchun (sizda departmentName/groupName map bo'lgani mumkin)
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  course?: number;

  @IsOptional()
  @IsString()
  group?: string;
}
