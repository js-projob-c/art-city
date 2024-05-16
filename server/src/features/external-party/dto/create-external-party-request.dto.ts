import { ExternalPartyType } from '@art-city/common/enums';
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExternalPartyRequestDto {
  @IsString()
  company: string;
  @IsString()
  contactName: string;
  @IsString()
  contactRole: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNumberString()
  phone: string;
  @IsEnum(ExternalPartyType)
  type: ExternalPartyType;
}
