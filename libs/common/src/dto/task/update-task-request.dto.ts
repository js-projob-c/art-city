import { TaskStatus } from '@art-city/common/enums';
import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { CreateTaskRequestDto } from './create-task-request.dto';

export class UpdateTaskRequestDto extends PartialType(CreateTaskRequestDto) {
  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  progress: number;

  @IsOptional()
  @IsIn([TaskStatus.ABANDONED])
  status: TaskStatus;

  @Exclude()
  projectId?: string;
}
