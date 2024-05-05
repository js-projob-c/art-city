import { REGEX } from '@art-city/common/constants';
import {
  ArrayUnique,
  IsDateString,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateScheduleRequestDto {
  @IsString({ each: true })
  @Matches(REGEX.DATE, { each: true })
  @IsDateString({}, { each: true })
  @ArrayUnique()
  dates: string[];

  @IsUUID()
  userId: string;
}
