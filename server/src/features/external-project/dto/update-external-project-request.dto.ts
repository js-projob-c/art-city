import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateExternalProjectRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(ExternalProjectStatus)
  status: ExternalProjectStatus;
}
