import { REGEX } from '@art-city/common/constants';
import { ReimburseType } from '@art-city/common/enums';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateReimburseApplicationRequestDto {
  @IsDateString()
  @Matches(REGEX.DATE)
  date: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsEnum(ReimburseType)
  type: ReimburseType;

  @IsOptional()
  @IsUrl()
  supportDocument: string;
}
