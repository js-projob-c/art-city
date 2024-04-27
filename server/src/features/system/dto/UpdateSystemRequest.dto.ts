import { REGEX } from '@art-city/common/constants';
import { ISystem } from '@art-city/common/types';
import { IsOptional, Matches } from 'class-validator';

export class UpdateSystemRequest implements Partial<ISystem> {
  @IsOptional()
  @Matches(REGEX.time)
  workHourFrom: string;
  @IsOptional()
  @Matches(REGEX.time)
  workHourTo: string;
}
