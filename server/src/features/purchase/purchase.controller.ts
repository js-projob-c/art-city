import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ExternalPartyEntity } from 'src/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExternalPartyService } from '../external-party/external-party.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly externalPartyService: ExternalPartyService,
  ) {}

  @UseGuards(new JwtAuthGuard())
  @Post()
  async createPurchase(@Body() dto: CreatePurchaseRequestDto) {
    const { externalPartyId, ...rest } = dto;
    const externalParty =
      await this.externalPartyService.validateAndGetExternalParty(
        externalPartyId,
      );
    return await this.purchaseService.createPurchase(rest, externalParty);
  }

  @UseGuards(new JwtAuthGuard())
  @Put('/:purchaseId')
  async updatePurchase(
    @Param('purchaseId') purchaseId: string,
    @Body() dto: UpdatePurchaseRequestDto,
  ) {
    const { externalPartyId, ...rest } = dto;
    if (externalPartyId) {
      await this.externalPartyService.validateAndGetExternalParty(
        externalPartyId,
      );
    }
    return await this.purchaseService.updatePurchase(purchaseId, {
      ...rest,
      ...(externalPartyId && {
        externalParty: { id: externalPartyId } as ExternalPartyEntity,
      }),
    });
  }
}
