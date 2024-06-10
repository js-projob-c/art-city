import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateExternalProjectRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ExternalProjectStatus)
  @IsOptional()
  status?: ExternalProjectStatus;

  @IsUUID()
  @IsOptional()
  externalPartyId?: string;
}
