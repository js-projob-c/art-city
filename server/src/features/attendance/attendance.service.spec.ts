import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import {
  AttendanceEntity,
  SystemEntity,
  UserEntity,
} from 'src/database/entities';
import { AttendanceRepository } from 'src/database/repositories';

import { SystemService } from '../system/system.service';
import { UserService } from '../user/user.service';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let attendanceRepo: AttendanceRepository;
  let systemService: SystemService;
  let userService: UserService;

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
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AttendanceService>(AttendanceService);
    attendanceRepo = module.get<AttendanceRepository>(AttendanceRepository);
    systemService = module.get<SystemService>(SystemService);
    userService = module.get<UserService>(UserService);
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

      const user = { id: userId } as UserEntity; // Create UserEntity object using userId
      jest.spyOn(systemService, 'getSystem').mockResolvedValue(system);
      jest
        .spyOn(attendanceRepo, 'save')
        .mockResolvedValue({ id: 'attendance123' } as any);

      const result = await service.signInByUser(user, date); // Pass user object as argument

      expect(systemService.getSystem).toHaveBeenCalled();
      expect(attendanceRepo.save).toHaveBeenCalledWith({
        userId: user,
        signInAt: expect.any(String),
        workHourFrom: system.workHourFrom,
        workHourTo: system.workHourTo,
      });
      expect(result).toEqual({ id: 'attendance123' });
    });

    it('should throw an error if system is not found', async () => {
      const userId = { id: 'user123' } as UserEntity;
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

      jest
        .spyOn(attendanceRepo, 'findOneByUserAndDate')
        .mockResolvedValue(attendance);

      const user = { id: userId } as UserEntity; // Create UserEntity object using userId
      const result = await service.signOutByUser(
        user, // Pass user object as argument
        checkInDate,
      );

      expect(attendanceRepo.findOneByUserAndDate).toHaveBeenCalledWith(
        userId,
        checkInDate,
      );
      expect(result).toEqual(attendance);
      expect(result.signOutAt).toBeDefined();
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

      const user = { id: userId } as UserEntity; // Create UserEntity object using userId
      const result = await service.signOutByUser(
        user, // Pass user object as argument
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
        service.signOutByUser({ id: userId } as UserEntity, checkInDate),
      ).rejects.toThrowError('Attendance not found');
    });
  });

  describe('getAttendanceByUser', () => {
    it('should return attendances for a user', async () => {
      // Arrange
      const userId = 'user123';
      const user = { id: userId } as UserEntity;
      const attendances = [{ id: 'attendance123' }] as AttendanceEntity[];

      jest.spyOn(userService, 'validateAndGetUser').mockResolvedValue(user);
      jest.spyOn(attendanceRepo, 'find').mockResolvedValue(attendances);

      // Act
      const result = await service.getAttendanceByUser(userId);

      // Assert
      expect(userService.validateAndGetUser).toHaveBeenCalledWith(userId);
      expect(attendanceRepo.find).toHaveBeenCalledWith({
        where: { user: { id: user.id } },
      });
      expect(result).toEqual(attendances);
    });

    it("should throw an error if user doesn't exist", async () => {
      // Arrange
      const userId = 'user123';

      jest
        .spyOn(userService, 'validateAndGetUser')
        .mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getAttendanceByUser(userId)).rejects.toThrow();
    });

    it('should return an empty array if no attendances are found', async () => {
      // Arrange
      const userId = 'user123';
      const user = { id: userId } as UserEntity;

      jest.spyOn(userService, 'validateAndGetUser').mockResolvedValue(user);
      jest.spyOn(attendanceRepo, 'find').mockResolvedValue([]);

      // Act
      const result = await service.getAttendanceByUser(userId);

      // Assert
      expect(userService.validateAndGetUser).toHaveBeenCalledWith(userId);
      expect(attendanceRepo.find).toHaveBeenCalledWith({
        where: { user: { id: user.id } },
      });
      expect(result).toEqual([]);
    });
  });

  describe('updateAttendance', () => {
    it('should update the attendance record', async () => {
      // Arrange
      const attendanceId = 'attendance123';
      const payload = {
        signInAt: '2022-01-01T09:00:00Z',
        signOutAt: '2022-01-01T17:00:00Z',
        supportDocument: 'document.pdf',
        remarks: 'Updated remarks',
      };

      const existingAttendance = { id: attendanceId } as AttendanceEntity;
      jest
        .spyOn(attendanceRepo, 'findOne')
        .mockResolvedValue(existingAttendance);
      jest.spyOn(attendanceRepo, 'save').mockResolvedValue(existingAttendance);

      // Act
      const result = await service.updateAttendance(attendanceId, payload);

      // Assert
      expect(attendanceRepo.findOne).toHaveBeenCalledWith({
        where: { id: attendanceId },
      });
      expect(attendanceRepo.save).toHaveBeenCalledWith({
        ...existingAttendance,
        ...payload,
      });
      expect(result).toEqual(existingAttendance);
    });

    it('should throw a NotFoundException if attendance record is not found', async () => {
      // Arrange
      const attendanceId = 'nonexistent123';
      const payload = {
        signInAt: '2022-01-01T09:00:00Z',
        signOutAt: '2022-01-01T17:00:00Z',
        supportDocument: 'document.pdf',
        remarks: 'Updated remarks',
      };

      jest.spyOn(attendanceRepo, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.updateAttendance(attendanceId, payload),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
