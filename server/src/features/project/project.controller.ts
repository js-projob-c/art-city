import { UserRole } from '@art-city/common/enums';
import { UserUtil } from '@art-city/common/utils/user.util';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';

import { CreateProjectRequestDto } from '../../../../libs/common/src/dto/project/create-project-request.dto';
import { UpdateProjectRequestDto } from '../../../../libs/common/src/dto/project/update-project-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
    const { isAbandoned = false, ...reset } = dto;
    await this.projectService.updateProject(projectId, reset, isAbandoned);
    return await this.projectService.validateAndGetProjectById(projectId);
  }

  @UseGuards(new JwtAuthGuard())
  @Get()
  async getProjects(@User() user: UserEntity, @Query('userId') userId: string) {
    const targetUserId = UserUtil.checkRoleAndOverrideUserId(user, userId);
    return await this.projectService.getProjects({
      ...(userId && { owner: { id: targetUserId } as UserEntity }),
    });
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Delete(':projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    await this.projectService.deleteProject(projectId);
  }

  // @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.MANAGER]))
  // @Get('user')
  // async getUserProjects(@User() user: UserEntity) {
  //   return await this.projectService.getProjects({
  //     owner: { id: user.id } as UserEntity,
  //   });
  // }
}
