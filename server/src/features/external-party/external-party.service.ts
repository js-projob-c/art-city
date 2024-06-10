import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import {
  ExternalPartyEntity,
  ExternalProjectEntity,
} from 'src/database/entities';
import { ExternalPartyRepository } from 'src/database/repositories';
import { EntityManager } from 'typeorm';

@Injectable()
export class ExternalPartyService {
  constructor(
    private readonly externalPartyRepository: ExternalPartyRepository,
    private readonly entityManager: EntityManager,
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

  async softDelete(externalPartyId: string) {
    await this.entityManager.transaction(async (em) => {
      const externalProjects = await em.find(ExternalProjectEntity, {
        where: { externalParty: { id: externalPartyId } },
      });
      if (externalProjects.length > 0) {
        throw new BadRequestException(
          new ErrorResponseEntity({
            code: ERROR_CODES.EXTERNAL_PARTY.EXTERNAL_PROJECTS_EXIST,
          }),
        );
      }
      await em.softDelete(ExternalPartyEntity, { id: externalPartyId });
    });
  }

  async validateAndGetExternalParty(externalPartyId: string) {
    const entity = await this.externalPartyRepository.findOne({
      where: { id: externalPartyId || PLACEHOLDERS.INCORRECT_ID },
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
        ...(filter as any),
      },
      relations: ['orders'],
    });
  }
}
