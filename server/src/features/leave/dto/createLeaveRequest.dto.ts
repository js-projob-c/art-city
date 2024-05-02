import { LeaveDayType, LeaveType } from '@art-city/common/enums';
import { ILeave } from '@art-city/common/types';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateLeaveRequestDto implements Partial<ILeave> {
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

  @IsEnum(LeaveType)
  type: LeaveType;
}
