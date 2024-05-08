import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateExternalPartyRequestDto {
  @IsOptional()
  @IsString()
  company: string;
  @IsOptional()
  @IsString()
  contactName: string;
  @IsOptional()
  @IsString()
  contactRole: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNumberString()
  phone: string;
}
