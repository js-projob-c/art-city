import { ERROR_CODES } from '@art-city/common/constants';
import { TaskStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { TaskRepository, UserRepository } from 'src/database/repositories';
import { TaskEntity } from 'src/entities';
import { In } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async validateAndGetTaskById(taskId: string) {
    const project = await this.taskRepository.findOne({
      where: { id: taskId },
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

  async createTask(payload: Partial<TaskEntity>) {
    const taskEntity = this.taskRepository.create(payload);
    return await this.taskRepository.save(taskEntity);
  }

  async updateTask(
    taskId: string,
    payload: Partial<TaskEntity> & { ownerIds?: string[] },
  ) {
    const { ownerIds, ...rest } = payload;
    const taskRecord = await this.validateAndGetTaskById(taskId);

    const upcomingStatus = rest.status || taskRecord.status;
    const upcomingProgress = rest.progress || taskRecord.progress || 0;

    if (upcomingStatus !== TaskStatus.ABANDONED) {
      rest.status = this.getTaskStatusByProgress(upcomingProgress);
    }

    if (ownerIds) {
      await this.validateAndGetOwners(ownerIds);
    }

    return await this.taskRepository.save({
      ...rest,
      ...(ownerIds && { users: ownerIds.map((id) => ({ id })) }),
      id: taskId,
    });
  }

  async validateAndGetOwners(ownerIds: string[]) {
    const owner = await this.userRepository.find({
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
