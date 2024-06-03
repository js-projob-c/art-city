import { ProjectStatus } from '@art-city/common/enums';
import { PartialType } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

import { CreateProjectRequestDto } from './create-project-request.dto';

export class UpdateProjectRequestDto extends PartialType(
  CreateProjectRequestDto,
) {
  @IsOptional()
  @IsIn([ProjectStatus.ABANDONED])
  status: ProjectStatus;
}
