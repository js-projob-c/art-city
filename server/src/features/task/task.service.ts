import { ERROR_CODES } from '@art-city/common/constants';
import { TaskStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { TaskRepository, UserRepository } from 'src/database/repositories';
import { TaskEntity, UserEntity } from 'src/entities';
import { EntityManager, In } from 'typeorm';

import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
    private readonly projectService: ProjectService,
  ) {}

  async validateAndGetTaskById(taskId: string, em?: EntityManager) {
    const manager = em || this.taskRepository.manager;
    const project = await manager.findOne(TaskEntity, {
      where: { id: taskId },
      relations: ['project'],
    });
    if (!project) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.TASK.TASK_NOT_FOUND,
        }),
      );
    }
    return project;
  }

  async createTask(payload: Partial<TaskEntity> & { ownerIds?: string[] }) {
    const { projectId, ownerIds = [] } = payload;
    return await this.entityManager.transaction(async (em) => {
      const taskEntity = this.taskRepository.create({
        status: TaskStatus.PENDING,
        ...payload,
        project: { id: projectId },
        users: ownerIds.map((id) => ({ id })),
      });
      await em.save(UserEntity, { id: ownerIds[0], tasks: [] });
      return await em.save(TaskEntity, taskEntity);
    });
  }

  async updateTask(
    taskId: string,
    payload: Partial<TaskEntity> & { ownerIds?: string[] },
  ) {
    return await this.entityManager.transaction(async (em) => {
      delete payload['projectId'];
      const { ownerIds = [], ...rest } = payload;
      const taskRecord = await this.validateAndGetTaskById(taskId, em);

      const upcomingStatus = rest.status || taskRecord.status;
      const upcomingProgress = rest.progress || taskRecord.progress || 0;

      if (upcomingStatus !== TaskStatus.ABANDONED) {
        rest.status = this.getTaskStatusByProgress(upcomingProgress);
      }

      if (ownerIds) {
        await this.validateAndGetOwners(ownerIds, em);
      }

      const task = await em.save(TaskEntity, {
        ...rest,
        ...(ownerIds && { users: ownerIds.map((id) => ({ id })) }),
        id: taskId,
      });

      await this.projectService.checkTasksProgressAndUpdateProjectStatus(
        taskRecord.project.id,
        em,
      );

      return task;
    });
  }

  async validateAndGetOwners(ownerIds: string[], em?: EntityManager) {
    const manager = em || this.userRepository.manager;
    const owner = await manager.find(UserEntity, {
      where: { id: In(ownerIds) },
    });
    if (owner.length !== ownerIds.length) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.TASK.OWNER_INVALID }),
      );
    }
    return owner;
  }

  getTaskStatusByProgress(progress: number) {
    if (progress >= 100) {
      return TaskStatus.COMPLETED;
    } else if (progress > 0) {
      return TaskStatus.IN_PROGRESS;
    } else {
      return TaskStatus.PENDING;
    }
  }
}
