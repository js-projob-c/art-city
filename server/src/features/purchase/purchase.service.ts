import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ExternalPartyEntity, PurchaseEntity } from 'src/database/entities';
import { PurchasePartyDetails } from 'src/database/entities/purchase.entity';
import { PurchaseRepository } from 'src/database/repositories';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  async createPurchase(
    payload: Partial<PurchaseEntity>,
    externalParty: ExternalPartyEntity,
  ) {
    const mappedExternalParty = externalParty
      ? this.mapExternalParty(externalParty)
      : undefined;
    const entity = this.purchaseRepository.create({
      ...payload,
      externalPartyDetails: mappedExternalParty,
    });
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

  mapExternalParty(
    externalParty: ExternalPartyEntity,
  ): PurchasePartyDetails | undefined {
    if (!externalParty) {
      return;
    }
    return {
      company: externalParty.company,
      contactName: externalParty.contactName,
      contactRole: externalParty.contactRole,
      email: externalParty.email,
      phone: externalParty.phone,
    };
  }
}
