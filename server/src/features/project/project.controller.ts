import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectRequestDto } from './dto/create-project-request.dto';
import { UpdateProjectRequestDto } from './dto/update-project-request.dto';
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
    @Body() dto: UpdateProjectRequestDto,
  ) {
    await this.projectService.updateProject(projectId, dto);
    return await this.projectService.validateAndGetProjectById(projectId);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  async getProjects(@Query('userId') userId: string) {
    return await this.projectService.getProjects({
      ...(userId && { owner: { id: userId } as UserEntity }),
    });
  }

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.MANAGER]))
  @Get('user')
  async getUserProjects(@User() user: UserEntity) {
    return await this.projectService.getProjects({
      owner: { id: user.id } as UserEntity,
    });
  }
}
