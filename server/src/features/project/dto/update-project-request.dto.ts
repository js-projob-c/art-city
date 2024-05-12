import { ProjectStatus } from '@art-city/common/enums';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { CreateProjectRequestDto } from './create-project-request.dto';

export class UpdateProjectRequestDto extends PartialType(
  CreateProjectRequestDto,
) {
  @Optional()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
