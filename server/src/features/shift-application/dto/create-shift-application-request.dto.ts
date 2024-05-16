import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ShiftApplicationEntity } from 'src/database/entities';

export class CreateShiftApplicationRequestDto
  implements Partial<ShiftApplicationEntity>
{
  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsOptional()
  @IsString()
  reason: string;
}
