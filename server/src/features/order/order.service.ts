import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ExternalPartyEntity, OrderEntity } from 'src/database/entities';
import {
  OrderItem,
  OrderPartyDetails,
} from 'src/database/entities/order.entity';
import { OrderRepository } from 'src/database/repositories';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrders(filters: Partial<OrderEntity> = {}) {
    return await this.orderRepository.find({
      where: filters,
    });
  }

  async createOrder(payload: Partial<OrderEntity>) {
    const mappedExternalParty = payload.externalParty
      ? this.mapExternalParty(payload.externalParty)
      : undefined;

    const entity = this.orderRepository.create({
      ...payload,
      totalAmount: this.calculateTotalAmount(payload.items ?? []),
      ...(mappedExternalParty && { externalParty: mappedExternalParty }),
    });

    return await this.orderRepository.save(entity);
  }

  async updateOrder(orderId: string, payload: Partial<OrderEntity>) {
    await this.validateAndGetOrderById(orderId);
    const entity = this.orderRepository.create({
      ...payload,
      ...(payload.items && {
        totalAmount: this.calculateTotalAmount(payload.items ?? []),
      }),
      id: orderId,
    });
    return await this.orderRepository.save(entity);
  }

  async validateAndGetOrderById(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.ORDER.ORDER_NOT_FOUND,
        }),
      );
    }
    return order;
  }

  calculateTotalAmount(orderItems: OrderItem[]): number {
    return orderItems.reduce(
      (total, item) => total + item.quantity * item.amount,
      0,
    );
  }

  mapExternalParty(
    externalParty: ExternalPartyEntity,
  ): OrderPartyDetails | undefined {
    if (!externalParty) {
      return undefined;
    }
    if (!externalParty.customerSource) {
      throw new Error(
        `customerSource is missing for externalParty ${externalParty.id}`,
      );
    }

    return {
      id: externalParty.id,
      company: externalParty.company,
      contactName: externalParty.contactName,
      contactRole: externalParty.contactRole,
      email: externalParty.email,
      phone: externalParty.phone,
      customerSource: externalParty.customerSource,
    };
  }
}
