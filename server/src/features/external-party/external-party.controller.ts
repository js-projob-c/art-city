import { ExternalPartyType, UserRole } from '@art-city/common/enums';
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
import { ExternalPartyEntity } from 'src/database/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateExternalPartyRequestDto } from './dto/update-external-party-request.dto';
import { ExternalPartyService } from './external-party.service';

@UseGuards(new JwtAuthGuard())
@Controller('external-party')
export class ExternalPartyController {
  constructor(private readonly externalPartyService: ExternalPartyService) {}

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Post()
  async createExternalParty(payload: Partial<ExternalPartyEntity>) {
    await this.externalPartyService.createExternalParty(payload);
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
}
