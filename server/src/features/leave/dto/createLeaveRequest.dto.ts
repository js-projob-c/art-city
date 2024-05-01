import { ILeave } from '@art-city/common/types';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateLeaveRequestDto implements Partial<ILeave> {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsOptional()
  @IsString()
  reason: string;
}
