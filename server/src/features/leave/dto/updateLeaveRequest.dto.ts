import { LeaveDayType } from '@art-city/common/enums';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateLeaveRequestDto {
  @IsDateString()
  from: string;

  @IsEnum(LeaveDayType)
  fromDayType: LeaveDayType;

  @IsDateString()
  to: string;

  @IsEnum(LeaveDayType)
  toDayType: LeaveDayType;

  @IsOptional()
  @IsString()
  reason: string;
}
