import { ExternalPartyType } from '@art-city/common/enums';
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateExternalPartyRequestDto {
  @IsString()
  company: string;
  @IsString()
  contactName: string;
  @IsString()
  contactRole: string;
  @IsEmail()
  @ValidateIf((_, value) => !!value)
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsNumberString()
  phone?: string;
  @IsEnum(ExternalPartyType)
  type: ExternalPartyType;
}
