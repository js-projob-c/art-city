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
  @Matches(REGEX.DATE)
  @IsDateString()
  @IsNotEmpty()
  fromDate: string;

  @Matches(REGEX.DATE)
  @IsDateString()
  @IsNotEmpty()
  toDate: string;

  @IsOptional()
  @IsString()
  reason: string;
}
