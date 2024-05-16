import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { ExternalProjectEntity } from 'src/database/entities';

export class CreateExternalProjectRequestDto
  implements Partial<ExternalProjectEntity>
{
  @IsUUID()
  externalPartyId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ExternalProjectStatus)
  status: ExternalProjectStatus;
}
