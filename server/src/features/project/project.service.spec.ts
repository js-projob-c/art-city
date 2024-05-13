import { ProjectStatus, TaskStatus } from '@art-city/common/enums';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskEntity } from 'src/entities';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProjectStatusByTasksProgress()', () => {
    it('should return PENDING if there is 0 non ABANDONED task', () => {
      const tasks = [{ progress: 50, status: TaskStatus.ABANDONED }];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.PENDING);
    });

    it('should return PENDING if all tasks have 0 progress', () => {
      const tasks = [{ progress: 0 }, { progress: 0 }];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.PENDING);
    });

    it('should return PENDING if all tasks have 0 progress disregard of any ABANDONED TASK not', () => {
      const tasks = [
        { progress: 0 },
        { progress: 0 },
        { progress: 100, status: TaskStatus.ABANDONED },
      ];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.PENDING);
    });

    it('should return IN_PROGRESS if any tasks has over 0 progress', () => {
      const tasks = [{ progress: 5 }, { progress: 0 }];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.IN_PROGRESS);
    });

    it('should return COMPLETED if all tasks have 100 progress', () => {
      const tasks = [{ progress: 100 }, { progress: 100 }];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.COMPLETED);
    });

    it('should return COMPLETED if all tasks have 100 progress disregard of any ABANDONED TASK not 100', () => {
      const tasks = [
        { progress: 100 },
        { progress: 0, status: TaskStatus.ABANDONED },
        { progress: 100 },
      ];
      const status = service.getProjectStatusByTasksProgress(
        tasks as TaskEntity[],
      );
      expect(status).toBe(ProjectStatus.COMPLETED);
    });
  });
});
