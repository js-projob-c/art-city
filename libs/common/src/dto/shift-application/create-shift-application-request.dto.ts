import { IShiftApplication } from '@art-city/common/types';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import { REGEX } from '../../constants';

export class CreateShiftApplicationRequestDto
  implements Partial<IShiftApplication>
{
  @IsNotEmpty()
  @IsDateString()
  @Matches(REGEX.DATE)
  fromDate: string;

  @IsNotEmpty()
  @IsDateString()
  @Matches(REGEX.DATE)
  toDate: string;

  @IsOptional()
  @IsString()
  reason: string;
}
