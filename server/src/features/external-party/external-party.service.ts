import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExternalPartyRepository } from 'src/database/repositories';
import { ExternalPartyEntity } from 'src/entities';

@Injectable()
export class ExternalPartyService {
  constructor(
    private readonly externalPartyRepository: ExternalPartyRepository,
  ) {}

  async createExternalParty(
    payload: Partial<ExternalPartyEntity>,
  ): Promise<ExternalPartyEntity> {
    const externalPartyEntity = this.externalPartyRepository.create(payload);
    return await this.externalPartyRepository.save(externalPartyEntity);
  }

  async updateExternalParty(
    externalPartyId: string,
    payload: Partial<ExternalPartyEntity>,
  ): Promise<ExternalPartyEntity> {
    return await this.externalPartyRepository.save({
      ...payload,
      id: externalPartyId,
    });
  }

  async validateAndGetExternalParty(externalPartyId: string) {
    const entity = await this.externalPartyRepository.findOne({
      where: { id: externalPartyId },
    });
    if (!entity) {
      throw new NotFoundException(
        ERROR_CODES.EXTERNAL_PARTY.EXTERNAL_PARTY_NOT_FOUND,
      );
    }
    return entity;
  }

  async getExternalParties(filter: Partial<ExternalPartyEntity> = {}) {
    return await this.externalPartyRepository.find({
      where: {
        ...filter,
      },
    });
  }
}