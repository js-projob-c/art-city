import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateExternalProjectRequestDto {
  @IsUUID()
  externalPartyId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ExternalProjectStatus)
  status: ExternalProjectStatus;
}
