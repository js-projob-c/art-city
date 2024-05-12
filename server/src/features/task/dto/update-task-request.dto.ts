import { TaskStatus } from '@art-city/common/enums';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { IsIn, IsNumber, Max, Min } from 'class-validator';

import { CreateTaskRequestDto } from './create-task-request.dto';

export class UpdateTaskRequestDto extends PartialType(CreateTaskRequestDto) {
  @Optional()
  @IsNumber()
  @Max(100)
  @Min(0)
  progress: number;

  @Optional()
  @IsIn([TaskStatus.ABANDONED])
  status: TaskStatus;
}
