import { TaskVisibleTo } from '@art-city/common/enums';
import { ArrayUnique, IsEnum, IsString } from 'class-validator';

export class CreateTaskRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @ArrayUnique()
  @IsString({ each: true })
  ownerIds: string[];

  @IsString()
  projectId: string;

  @IsEnum(TaskVisibleTo)
  visibleTo: TaskVisibleTo;
}
