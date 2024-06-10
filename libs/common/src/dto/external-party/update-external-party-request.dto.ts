import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateExternalPartyRequestDto {
  @IsOptional()
  @IsString()
  company?: string;
  @IsOptional()
  @IsString()
  contactName?: string;
  @IsOptional()
  @IsString()
  contactRole?: string;
  @IsOptional()
  @IsEmail()
  @ValidateIf((_, value) => !!value)
  email?: string;
  @IsOptional()
  @IsNumberString()
  phone?: string;
}
