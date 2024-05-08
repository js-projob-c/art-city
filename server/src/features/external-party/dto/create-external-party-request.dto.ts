import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

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
}
