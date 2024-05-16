import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExternalPartyEntity } from 'src/database/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExternalPartyService } from '../external-party/external-party.service';
import { CreateExternalProjectRequestDto } from './dto/create-external-project-request.dto';
import { UpdateExternalProjectRequestDto } from './dto/update-external-project-request.dto';
import { ExternalProjectService } from './external-project.service';

@UseGuards(new JwtAuthGuard())
@Controller('external-project')
export class ExternalProjectController {
  constructor(
    private readonly externalProjectService: ExternalProjectService,
    private readonly externalPartyService: ExternalPartyService,
  ) {}

  @Post()
  async createExternalProject(@Body() dto: CreateExternalProjectRequestDto) {
    const externalParty =
      await this.externalPartyService.validateAndGetExternalParty(
        dto.externalPartyId,
      );
    return await this.externalProjectService.createExternalProject({
      ...dto,
      ...(externalParty && {
        externalParty: { id: externalParty.id } as ExternalPartyEntity,
      }),
    });
  }

  @Put('/:externalProjectId')
  async updateExternalProject(
    @Param('externalProjectId') externalProjectId: string,
    @Body() dto: UpdateExternalProjectRequestDto,
  ) {
    return await this.externalProjectService.updateExternalProject(
      externalProjectId,
      dto,
    );
  }

  @Get()
  async getExternalProjects() {
    return await this.externalProjectService.getExternalProjects();
  }
}
