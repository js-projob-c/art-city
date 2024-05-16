import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExternalPartyEntity } from 'src/database/entities';

import { ExternalPartyService } from '../external-party/external-party.service';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { UpdateOrderRequestDto } from './dto/update-order-request.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly externalPartyService: ExternalPartyService,
  ) {}

  @Post()
  async createExternalProject(@Body() dto: CreateOrderRequestDto) {
    const externalParty =
      await this.externalPartyService.validateAndGetExternalParty(
        dto.externalPartyId,
      );
    return await this.orderService.createOrder({
      ...dto,
      ...(externalParty && {
        externalParty: { id: externalParty.id } as ExternalPartyEntity,
      }),
    });
  }

  @Put('/:externalProjectId')
  async updateExternalProject(
    @Param('externalProjectId') externalProjectId: string,
    @Body() dto: UpdateOrderRequestDto,
  ) {
    return await this.orderService.updateOrder(externalProjectId, dto);
  }

  @Get()
  async getExternalProjects() {
    return await this.orderService.getOrders();
  }
}
