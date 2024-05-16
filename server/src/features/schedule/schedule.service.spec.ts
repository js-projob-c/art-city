import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleEntity } from 'src/database/entities'; // Add missing import statement
import { EntityManager } from 'typeorm';

import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ScheduleService>(ScheduleService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('batchCreateSchedule', () => {
    it('should create schedules for the given user and dates', async () => {
      const userId = 'user123';
      const dates = ['2022-01-01', '2022-01-02'];

      const emMock = createMock<EntityManager>();
      jest
        .spyOn(service['entityManager'], 'transaction')
        .mockImplementation(async (cb: any) => {
          return cb(emMock);
        });
      const saveMock = jest
        .fn()
        .mockImplementation(async (_, { user, date }) => {
          const scheduleEntity = new ScheduleEntity();
          scheduleEntity.user = user as any;
          scheduleEntity.date = date;
          return scheduleEntity;
        });
      const entityCreateMock = jest.fn().mockImplementation((arg) => arg);
      const findByUserAndDateMock = jest.fn().mockResolvedValue([]);

      jest
        .spyOn(service['scheduleRepository'], 'findByUserAndDate')
        .mockImplementation(findByUserAndDateMock);
      jest.spyOn(emMock, 'save').mockImplementation(saveMock);
      jest
        .spyOn(service['scheduleRepository'], 'create')
        .mockImplementation(entityCreateMock);

      await service.batchCreateSchedule(userId, dates);

      expect(findByUserAndDateMock).toHaveBeenCalledWith(userId, dates, emMock);
      expect(entityCreateMock).toHaveBeenCalledTimes(dates.length);
      expect(saveMock).toHaveBeenCalledTimes(dates.length);
    });

    it('should throw BadRequestException if schedules already exist for the given user and dates', async () => {
      const userId = 'user123';
      const dates = ['2022-01-01', '2022-01-02'];

      const existingRecords = [{ date: '2022-01-01' }];

      jest
        .spyOn(entityManager, 'transaction')
        .mockImplementation(async (cb: any) => {
          return cb();
        });
      const findByUserAndDateMock = jest
        .fn()
        .mockResolvedValue(existingRecords);

      jest
        .spyOn(service['scheduleRepository'], 'findByUserAndDate')
        .mockImplementation(findByUserAndDateMock);

      let error;
      try {
        await service.batchCreateSchedule(userId, dates);
      } catch (err) {
        error = err;
      }

      expect(error).toEqual(expect.any(BadRequestException));
      expect(findByUserAndDateMock).toHaveBeenCalledWith(
        userId,
        dates,
        entityManager,
      );
    });

    it('should return a list of ScheduleEntity if succeeded', async () => {
      const userId = 'user123';
      const dates = ['2022-01-01', '2022-01-02'];

      const emMock = createMock<EntityManager>();
      jest
        .spyOn(service['entityManager'], 'transaction')
        .mockImplementation(async (cb: any) => {
          return cb(emMock);
        });
      const saveMock = jest
        .fn()
        .mockImplementation(async (_, { user, date }) => {
          const scheduleEntity = new ScheduleEntity();
          scheduleEntity.user = user as any;
          scheduleEntity.date = date;
          return scheduleEntity;
        });
      const entityCreateMock = jest.fn().mockImplementation((arg) => arg);
      const findByUserAndDateMock = jest.fn().mockResolvedValue([]);

      jest.spyOn(emMock, 'save').mockImplementation(saveMock);
      jest
        .spyOn(service['scheduleRepository'], 'create')
        .mockImplementation(entityCreateMock);
      jest
        .spyOn(service['scheduleRepository'], 'findByUserAndDate')
        .mockImplementation(findByUserAndDateMock);

      const result = await service.batchCreateSchedule(userId, dates);

      expect(findByUserAndDateMock).toHaveBeenCalledWith(userId, dates, emMock);
      expect(entityCreateMock).toHaveBeenCalledTimes(dates.length);
      expect(saveMock).toHaveBeenCalledTimes(dates.length);
      expect(result).toEqual(
        expect.arrayContaining([expect.any(ScheduleEntity)]),
      );
    });
  });
});
