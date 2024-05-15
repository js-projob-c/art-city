import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { PurchaseRepository } from 'src/database/repositories';
import { PurchaseEntity } from 'src/entities';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  async createPurchase(payload: Partial<PurchaseEntity>) {
    const entity = this.purchaseRepository.create(payload);
    return await this.purchaseRepository.save(entity);
  }

  async updatePurchase(purchaseId: string, payload: Partial<PurchaseEntity>) {
    await this.validateAndGetPurchaseById(purchaseId);
    return await this.purchaseRepository.save(payload);
  }

  async validateAndGetPurchaseById(purchaseId: string) {
    const purchase = await this.purchaseRepository.findOne({
      where: { id: purchaseId },
    });
    if (!purchase) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.PURCHASE.PURCHASE_NOT_FOUND,
        }),
      );
    }
    return purchase;
  }
}
