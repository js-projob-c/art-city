import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExternalPartyDetailsBuilder } from 'src/common/class/builders/externalPartyDetails.builder';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import {
  ExternalPartyEntity,
  ExternalProjectEntity,
} from 'src/database/entities';
import { ExternalProjectPartyDetails } from 'src/database/entities/external-project.entity';
import { ExternalProjectRepository } from 'src/database/repositories';
import { EntityManager } from 'typeorm';

import { ExternalPartyService } from '../external-party/external-party.service';

@Injectable()
export class ExternalProjectService {
  constructor(
    private readonly externalProjectRepository: ExternalProjectRepository,
    private readonly externalPartyService: ExternalPartyService,
    private readonly entityManager: EntityManager,
  ) {}

  async getExternalProjects(filters: Partial<ExternalProjectEntity> = {}) {
    return await this.externalProjectRepository.find({
      where: filters,
      relations: {
        externalParty: true,
      },
    });
  }

  async createExternalProject(
    payload: Partial<ExternalProjectEntity>,
    externalPartyId: string,
  ) {
    const externalParty =
      await this.externalPartyService.validateAndGetExternalParty(
        externalPartyId,
      );

    const externalPartyDetails = new ExternalPartyDetailsBuilder()
      .withCompany(externalParty.company)
      .withContactName(externalParty.contactName)
      .withContactRole(externalParty.contactRole)
      .withEmail(externalParty.email)
      .withPhone(externalParty.phone)
      .build();

    const entity = this.externalProjectRepository.create({
      ...payload,
      externalParty: { id: externalParty.id },
      externalPartyDetails,
    });
    return await this.externalProjectRepository.save(entity);
  }

  async updateExternalProject(
    externalProjectId: string,
    payload: Partial<ExternalProjectEntity>,
    externalPartyId?: string,
  ) {
    await this.validateAndGetExternalProjectById(externalProjectId);

    let externalParty: ExternalPartyEntity | undefined;
    let externalPartyDetails: ExternalProjectPartyDetails | undefined;

    if (externalPartyId) {
      externalParty =
        await this.externalPartyService.validateAndGetExternalParty(
          externalPartyId,
        );
      externalPartyDetails = new ExternalPartyDetailsBuilder()
        .withCompany(externalParty.company)
        .withContactName(externalParty.contactName)
        .withContactRole(externalParty.contactRole)
        .withEmail(externalParty.email)
        .withPhone(externalParty.phone)
        .build();
    }

    const entity = this.externalProjectRepository.create({
      ...payload,
      ...(externalParty && { externalParty: { id: externalParty.id } }),
      ...(externalPartyDetails && { externalPartyDetails }),
      id: externalProjectId,
    });
    return await this.externalProjectRepository.save(entity);
  }

  async deleteExternalProject(externalProjectId: string) {
    await this.entityManager.transaction(async (em: EntityManager) => {
      await this.validateAndGetExternalProjectById(externalProjectId, em);
      await em.softDelete(ExternalProjectEntity, { id: externalProjectId });
    });
  }

  async validateAndGetExternalProjectById(
    externalProjectId: string,
    em?: EntityManager,
  ) {
    const manager = em || this.externalProjectRepository.manager;
    const externalProject = await manager.findOne(ExternalProjectEntity, {
      where: { id: externalProjectId },
    });
    if (!externalProject) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.EXTERNAL_PROJECT.EXTERNAL_PROJECT_NOT_FOUND,
        }),
      );
    }
    return externalProject;
  }

  mapExternalParty(
    externalParty: ExternalPartyEntity,
  ): ExternalProjectPartyDetails | undefined {
    if (!externalParty) {
      return;
    }
    return {
      id: externalParty.id,
      company: externalParty.company,
      contactName: externalParty.contactName,
      contactRole: externalParty.contactRole,
      email: externalParty.email,
      phone: externalParty.phone,
    };
  }
}
