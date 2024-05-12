import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ProjectRepository, UserRepository } from 'src/database/repositories';
import { ProjectEntity } from 'src/entities';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async validateAndGetProjectById(projectId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.PROJECT.PROJECT_NOT_FOUND,
        }),
      );
    }
    return project;
  }

  async createProject(payload: Partial<ProjectEntity>) {
    const { ownerId } = payload;
    if (ownerId) {
      await this.validateAndGetOwner(ownerId);
    }
    const projectEntity = this.projectRepository.create(payload);
    return await this.projectRepository.save(projectEntity);
  }

  async updateProject(projectId: string, payload: Partial<ProjectEntity>) {
    const { ownerId } = payload;
    if (ownerId) {
      await this.validateAndGetOwner(ownerId);
    }
    return await this.projectRepository.save({
      ...payload,
      id: projectId,
    });
  }

  async validateAndGetOwner(ownerId: string) {
    const owner = await this.userRepository.findOne({
      where: { id: ownerId },
    });
    if (!owner) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.PROJECT.OWNER_INVALID }),
      );
    }
    return owner;
  }
}
