import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import {
  ExternalPartyEntity,
  ExternalProjectEntity,
} from 'src/database/entities';
import { ExternalProjectParty } from 'src/database/entities/external-project.entity';
import { ExternalProjectRepository } from 'src/database/repositories';

@Injectable()
export class ExternalProjectService {
  constructor(
    private readonly externalProjectRepository: ExternalProjectRepository,
  ) {}

  async getExternalProjects(filters: Partial<ExternalProjectEntity> = {}) {
    return await this.externalProjectRepository.find({
      where: filters,
    });
  }

  async createExternalProject(payload: Partial<ExternalProjectEntity>) {
    const mappedExternalParty = payload.externalParty
      ? this.mapExternalParty(payload.externalParty)
      : undefined;
    const entity = this.externalProjectRepository.create({
      ...payload,
      ...(mappedExternalParty && { externalParty: mappedExternalParty }),
    });
    return await this.externalProjectRepository.save(entity);
  }

  async updateExternalProject(
    externalProjectId: string,
    payload: Partial<ExternalProjectEntity>,
  ) {
    await this.validateAndGetExternalProjectById(externalProjectId);
    const entity = this.externalProjectRepository.create({
      ...payload,
      id: externalProjectId,
    });
    return await this.externalProjectRepository.save(entity);
  }

  async validateAndGetExternalProjectById(externalProjectId: string) {
    const externalProject = await this.externalProjectRepository.findOne({
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
  ): ExternalProjectParty | undefined {
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
