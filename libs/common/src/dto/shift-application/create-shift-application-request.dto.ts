import { IShiftApplication } from '@art-city/common/types';
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

import { REGEX } from '../../constants';

export class CreateShiftApplicationRequestDto
  implements Partial<IShiftApplication>
{
  @IsDateString()
  @Matches(REGEX.DATE)
  fromDate: string;

  @IsDateString()
  @Matches(REGEX.DATE)
  toDate: string;

  @IsOptional()
  @IsString()
  reason: string;
}
