import { UserRole } from '@art-city/common/enums';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsInt()
  @IsPositive()
  monthlySalary: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  annualLeave: number;
}
