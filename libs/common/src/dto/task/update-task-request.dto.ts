import { TaskVisibleTo } from '@art-city/common/enums';
import {
  ArrayUnique,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateTaskRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayUnique()
  @IsString({ each: true })
  @IsOptional()
  ownerIds: string[];

  @IsEnum(TaskVisibleTo)
  @IsOptional()
  visibleTo: TaskVisibleTo;

  @IsNumber()
  @Max(100)
  @Min(0)
  @IsOptional()
  progress: number;

  @IsBoolean()
  @IsOptional()
  isAbandoned?: boolean;
}
