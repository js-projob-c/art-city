import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateLeaveRequestDto {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsOptional()
  @IsString()
  reason: string;
}
