import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectRequestDto } from './dto/create-project-request.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(new JwtAuthGuard())
  @Post()
  async createProject(@Body() dto: CreateProjectRequestDto) {
    return await this.projectService.createProject(dto);
  }

  @UseGuards(new JwtAuthGuard())
  @Put('/:projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() dto: CreateProjectRequestDto,
  ) {
    await this.projectService.validateAndGetProjectById(projectId);
    return await this.projectService.updateProject(projectId, dto);
  }
}
