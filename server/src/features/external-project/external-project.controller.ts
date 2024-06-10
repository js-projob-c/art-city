import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateExternalProjectRequestDto } from '../../../../libs/common/src/dto/external-project/create-external-project-request.dto';
import { UpdateExternalProjectRequestDto } from '../../../../libs/common/src/dto/external-project/update-external-project-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExternalProjectService } from './external-project.service';

@UseGuards(new JwtAuthGuard())
@Controller('external-project')
export class ExternalProjectController {
  constructor(
    private readonly externalProjectService: ExternalProjectService,
  ) {}

  @Post()
  async createExternalProject(@Body() dto: CreateExternalProjectRequestDto) {
    const { externalPartyId, ...rest } = dto;
    return await this.externalProjectService.createExternalProject(
      rest,
      externalPartyId,
    );
  }

  @Put('/:externalProjectId')
  async updateExternalProject(
    @Param('externalProjectId') externalProjectId: string,
    @Body() dto: UpdateExternalProjectRequestDto,
  ) {
    const { externalPartyId, ...rest } = dto;
    return await this.externalProjectService.updateExternalProject(
      externalProjectId,
      rest,
      externalPartyId,
    );
  }

  @Get()
  async getExternalProjects() {
    return await this.externalProjectService.getExternalProjects();
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Delete(':externalProjectId')
  async deleteProject(@Param('externalProjectId') externalProjectId: string) {
    await this.externalProjectService.deleteExternalProject(externalProjectId);
  }
}
