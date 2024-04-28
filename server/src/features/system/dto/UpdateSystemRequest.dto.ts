import { REGEX } from '@art-city/common/constants';
import { ISystem } from '@art-city/common/types';
import { IsOptional, Matches } from 'class-validator';

export class UpdateSystemRequestDto implements Partial<ISystem> {
  @IsOptional()
  @Matches(REGEX.TIME)
  workHourFrom: string;
  @IsOptional()
  @Matches(REGEX.TIME)
  workHourTo: string;
}
