import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateTaskRequestDto } from '../../../../libs/common/src/dto/task/create-task-request.dto';
import { UpdateTaskRequestDto } from '../../../../libs/common/src/dto/task/update-task-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from '../project/project.service';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}
  @Post()
  async createTask(@Body() dto: CreateTaskRequestDto) {
    await this.projectService.validateAndGetProjectById(dto.projectId);
    return await this.taskService.createTask(dto);
  }

  @Put('/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskRequestDto,
  ) {
    const { isAbandoned = false, ...rest } = dto;
    return await this.taskService.updateTask(taskId, rest, isAbandoned);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    await this.taskService.deleteTask(taskId);
  }
}
