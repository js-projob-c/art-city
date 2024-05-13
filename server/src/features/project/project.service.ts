import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { ProjectStatus, TaskStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ProjectRepository, UserRepository } from 'src/database/repositories';
import { ProjectEntity, TaskEntity, UserEntity } from 'src/entities';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getProjects(filter: Partial<ProjectEntity> = {}) {
    return await this.projectRepository.find({
      where: filter,
      relations: ['tasks'],
    });
  }

  async validateAndGetProjectById(projectId: string, em?: EntityManager) {
    const manager = em || this.projectRepository.manager;
    const project = await manager.findOne(ProjectEntity, {
      where: { id: projectId },
      relations: ['tasks', 'owner'],
      select: {
        owner: {
          id: true,
          email: true,
        },
      },
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
    const projectEntity = this.projectRepository.create({
      status: ProjectStatus.PENDING,
      ...payload,
    });
    return await this.projectRepository.save(projectEntity);
  }

  async updateProject(projectId: string, payload: Partial<ProjectEntity>) {
    return await this.entityManager.transaction(async (em) => {
      const project = await this.validateAndGetProjectById(projectId, em);
      const { ownerId, ...rest } = payload;
      if (ownerId) {
        await this.validateAndGetOwner(ownerId, em);
      }
      let status = payload.status || project.status;
      if (status !== ProjectStatus.ABANDONED) {
        const tasks = await em.find(TaskEntity, {
          where: { project: { id: project.id } },
        });
        status = this.getProjectStatusByTasksProgress(tasks);
      }
      await this.projectRepository.save({
        ...rest,
        id: projectId,
        status,
        ...(ownerId && { owner: { id: ownerId } }),
      });
    });
  }

  async validateAndGetOwner(ownerId: string, em?: EntityManager) {
    const manager = em || this.projectRepository.manager;
    const owner = await manager.findOne(UserEntity, {
      where: { id: ownerId },
    });
    if (!owner) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.PROJECT.OWNER_INVALID }),
      );
    }
    return owner;
  }

  async checkTasksProgressAndUpdateProjectStatus(
    projectId: string,
    em?: EntityManager,
  ) {
    const manager = em || this.projectRepository.manager;
    const project = await manager.findOne(ProjectEntity, {
      where: { id: projectId || PLACEHOLDERS.INCORRECT_ID },
    });

    if (!project) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.PROJECT.PROJECT_NOT_FOUND,
        }),
      );
    }

    const projectStatus = project?.status;

    const tasks = await manager.find(TaskEntity, {
      where: { project: { id: project?.id } },
    });

    const status = this.getProjectStatusByTasksProgress(tasks);

    await manager.update(ProjectEntity, { projectId }, { status });

    return projectStatus;
  }

  getProjectStatusByTasksProgress(tasks: TaskEntity[]): ProjectStatus {
    const nonAbandonedTasks = tasks.filter(
      (task) => task.status !== TaskStatus.ABANDONED,
    );

    if (nonAbandonedTasks.length === 0) {
      return ProjectStatus.PENDING;
    } else if (nonAbandonedTasks.every((task) => task.progress === 100)) {
      return ProjectStatus.COMPLETED;
    } else if (nonAbandonedTasks.some((task) => task.progress > 0)) {
      return ProjectStatus.IN_PROGRESS;
    } else {
      return ProjectStatus.PENDING;
    }
  }
}
