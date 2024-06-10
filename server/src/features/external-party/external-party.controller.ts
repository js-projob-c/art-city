import { CreateExternalPartyRequestDto } from '@art-city/common/dto/dto/create-external-party-request.dto';
import { UpdateExternalPartyRequestDto } from '@art-city/common/dto/dto/update-external-party-request.dto';
import { ExternalPartyType, UserRole } from '@art-city/common/enums';
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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExternalPartyService } from './external-party.service';

@UseGuards(new JwtAuthGuard())
@Controller('external-party')
export class ExternalPartyController {
  constructor(private readonly externalPartyService: ExternalPartyService) {}

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Post()
  async createExternalParty(@Body() dto: CreateExternalPartyRequestDto) {
    await this.externalPartyService.createExternalParty(dto);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put('/:externalPartyId')
  async updateExternalParty(
    @Param('externalPartyId') externalPartyId: string,
    @Body() dto: UpdateExternalPartyRequestDto,
  ) {
    await this.externalPartyService.validateAndGetExternalParty(
      externalPartyId,
    );
    await this.externalPartyService.updateExternalParty(externalPartyId, dto);
  }

  @Get()
  async getExternalParties(@Query('type') type: ExternalPartyType) {
    return await this.externalPartyService.getExternalParties({ type });
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Delete(':externalPartyId')
  async deleteProject(@Param('externalPartyId') externalPartyId: string) {
    await this.externalPartyService.softDelete(externalPartyId);
  }
}
