import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { ProjectStatus, TaskStatus } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ProjectEntity, TaskEntity, UserEntity } from 'src/database/entities';
import { ProjectRepository } from 'src/database/repositories';
import { EntityManager, In } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getProjects(filter: Partial<ProjectEntity> = {}) {
    return await this.projectRepository.find({
      where: filter,
      relations: ['tasks', 'owner', 'tasks.users'],
      order: { createdAt: 'ASC', tasks: { createdAt: 'ASC' } },
    });
  }

  async validateAndGetProjectById(projectId: string, em?: EntityManager) {
    const manager = em || this.projectRepository.manager;
    const project = await manager.findOne(ProjectEntity, {
      where: { id: projectId || PLACEHOLDERS.INCORRECT_ID },
      relations: ['tasks', 'owner'],
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

  async updateProject(
    projectId: string,
    payload: Partial<ProjectEntity>,
    isAbandoned: boolean,
  ) {
    return await this.entityManager.transaction(async (em) => {
      const project = await this.validateAndGetProjectById(projectId, em);
      const { ownerId, ...rest } = payload;
      if (ownerId) {
        await this.validateAndGetOwner(ownerId, em);
      }
      let status = payload.status || project.status;
      if (!isAbandoned) {
        const tasks = await em.find(TaskEntity, {
          where: { project: { id: project.id } },
        });
        status = this.getProjectStatusByTasksProgress(tasks);
      } else {
        status = ProjectStatus.ABANDONED;
        // await this.updateAllTaskToAbandoned(projectId, em);
      }
      await this.projectRepository.save({
        ...rest,
        id: projectId,
        status,
        ...(ownerId && { owner: { id: ownerId } }),
      });
    });
  }

  async deleteProject(projectId: string) {
    await this.entityManager.transaction(async (em: EntityManager) => {
      const project = await this.validateAndGetProjectById(projectId, em);
      const tasks = project.tasks ?? [];
      await em.delete(ProjectEntity, { id: projectId });
      for (const task of tasks) {
        await em.delete(TaskEntity, { id: task.id });
      }
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

    const isCompleted =
      projectStatus !== ProjectStatus.COMPLETED &&
      status === ProjectStatus.COMPLETED;

    await manager.save(ProjectEntity, {
      id: projectId,
      status,
      ...(isCompleted && { completedAt: DatetimeUtil.moment().toISOString() }),
    });

    return projectStatus;
  }

  async updateAllTaskToAbandoned(projectId: string, em?: EntityManager) {
    const manager = em || this.projectRepository.manager;
    const tasks = await manager.find(TaskEntity, {
      where: { project: { id: projectId } },
    });
    await manager.update(
      TaskEntity,
      { id: In(tasks.map((task) => task.id)) },
      { status: TaskStatus.ABANDONED },
    );
    return tasks;
  }

  getProjectStatusByTasksProgress(tasks: TaskEntity[]): ProjectStatus {
    const nonAbandonedTasks = tasks.filter(
      (task) => task.status !== TaskStatus.ABANDONED,
    );

    if (tasks.length > 0 && nonAbandonedTasks.length === 0) {
      return ProjectStatus.ABANDONED;
    } else if (nonAbandonedTasks.length === 0) {
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
