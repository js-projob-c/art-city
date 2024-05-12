import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import { ProjectService } from '../project/project.service';
import { CreateTaskRequestDto } from './dto/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/update-task-request.dto';
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
    return await this.taskService.updateTask(taskId, dto);
  }
}
