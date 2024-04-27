import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import { AttendanceRepository } from 'src/database/repositories';
import { AttendanceEntity, SystemEntity } from 'src/entities';

import { SystemService } from '../system/system.service';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let attendanceRepo: AttendanceRepository;
  let systemService: SystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: AttendanceRepository,
          useValue: createMock<AttendanceRepository>(),
        },
        {
          provide: SystemService,
          useValue: createMock<SystemService>(),
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    attendanceRepo = module.get<AttendanceRepository>(AttendanceRepository);
    systemService = module.get<SystemService>(SystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signInByUser', () => {
    it('should create a new attendance record', async () => {
      const userId = 'user123';
      const date = '2022-01-01';
      const system = {
        workHourFrom: '09:00',
        workHourTo: '17:00',
      } as SystemEntity;

      jest.spyOn(systemService, 'getSystem').mockResolvedValue(system);
      jest
        .spyOn(attendanceRepo, 'save')
        .mockResolvedValueOnce({ id: 'attendance123' } as AttendanceEntity);

      const result = await service.signInByUser(userId, date);

      expect(systemService.getSystem).toHaveBeenCalled();
      expect(attendanceRepo.save).toHaveBeenCalledWith({
        userId,
        signInAt: expect.any(String),
        workHourFrom: system.workHourFrom,
        workHourTo: system.workHourTo,
      });
      expect(result).toEqual({ id: 'attendance123' });
    });

    it('should throw an error if system is not found', async () => {
      const userId = 'user123';
      const date = '2022-01-01';

      jest.spyOn(systemService, 'getSystem').mockResolvedValue(null);

      await expect(service.signInByUser(userId, date)).rejects.toThrowError(
        'System not found',
      );
    });
  });

  describe('signOutByUser', () => {
    it('should update the signOutAt property as current datetime if no date is passed as argument', async () => {
      const userId = 'user123';
      const checkInDate = '2022-01-01';
      const attendance = {
        id: 'attendance123',
        signInAt: DatetimeUtil.moment(checkInDate).toISOString(),
      } as AttendanceEntity;
      const expectedSignOutDate = DatetimeUtil.moment().toISOString();

      jest
        .spyOn(attendanceRepo, 'findOneByUserAndDate')
        .mockResolvedValue(attendance);

      jest
        .spyOn(DatetimeUtil.moment(), 'toISOString')
        .mockReturnValueOnce(expectedSignOutDate);
      jest.spyOn(attendanceRepo, 'save').mockResolvedValue(attendance);

      const result = await service.signOutByUser(userId, checkInDate);

      expect(attendanceRepo.findOneByUserAndDate).toHaveBeenCalledWith(
        userId,
        checkInDate,
      );
      expect(attendanceRepo.save).toHaveBeenCalledWith({
        ...attendance,
        signOutAt: expectedSignOutDate,
      });
      expect(result).toEqual(attendance);
    });

    it('should update the signOutAt property of the attendance record', async () => {
      const userId = 'user123';
      const checkInDate = '2022-01-01';
      const signOutDate = '2022-01-02';
      const attendance = { id: 'attendance123' } as AttendanceEntity;

      jest
        .spyOn(attendanceRepo, 'findOneByUserAndDate')
        .mockResolvedValue(attendance);
      jest
        .spyOn(DatetimeUtil, 'moment')
        .mockReturnValueOnce(DatetimeUtil.moment(signOutDate));
      jest.spyOn(attendanceRepo, 'save').mockResolvedValue(attendance);

      const result = await service.signOutByUser(
        userId,
        checkInDate,
        signOutDate,
      );

      expect(attendanceRepo.findOneByUserAndDate).toHaveBeenCalledWith(
        userId,
        checkInDate,
      );
      expect(DatetimeUtil.moment).toHaveBeenCalledWith(signOutDate);
      expect(attendanceRepo.save).toHaveBeenCalledWith(attendance);
      expect(result).toEqual(attendance);
    });

    it('should throw an error if attendance record is not found', async () => {
      const userId = 'user123';
      const checkInDate = '2022-01-01';

      jest
        .spyOn(attendanceRepo, 'findOneByUserAndDate')
        .mockResolvedValue(null);

      await expect(
        service.signOutByUser(userId, checkInDate),
      ).rejects.toThrowError('Attendance not found');
    });
  });
});
