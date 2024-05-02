import { LeaveDayType } from '@art-city/common/enums';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { LeaveEntity } from 'src/entities';

import { LeaveService } from './leave.service';

describe('LeaveService', () => {
  let service: LeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<LeaveService>(LeaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLeavesByUserId', () => {
    it('should return an array of leaves', async () => {
      // Arrange
      const userId = 'user-id';
      const year = 2022;
      const month = 9;

      jest.spyOn(service, 'getLeavesByUserId').mockResolvedValueOnce([]);

      // Act
      const result = await service.getLeavesByUserId(userId, year, month);

      // Assert
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('populateLeaveDays', () => {
    it('should populate the "days" property correctly', () => {
      // Arrange
      const leave: Pick<
        LeaveEntity,
        'from' | 'to' | 'fromDayType' | 'toDayType'
      > = {
        from: '2022-09-01',
        to: '2022-09-05',
        fromDayType: LeaveDayType.FULL,
        toDayType: LeaveDayType.FULL,
      }; // Thursday to Monday

      // Act
      const result = service.populateLeaveDays(leave);

      // Assert
      expect(result.days).toBe(3);
    });

    it('should handle half-day leave correctly', () => {
      // Arrange
      const leave: Pick<
        LeaveEntity,
        'from' | 'to' | 'fromDayType' | 'toDayType'
      > = {
        from: '2022-09-01',
        to: '2022-09-01',
        fromDayType: LeaveDayType.HALF_AM,
        toDayType: LeaveDayType.HALF_PM,
      };

      // Act
      const result = service.populateLeaveDays(leave);

      // Assert
      expect(result.days).toBe(0.5);
    });

    it('should handle same from and to date correctly', () => {
      // Arrange
      const leave: Pick<
        LeaveEntity,
        'from' | 'to' | 'fromDayType' | 'toDayType'
      > = {
        from: '2022-09-01',
        to: '2022-09-01',
        fromDayType: LeaveDayType.FULL,
        toDayType: LeaveDayType.FULL,
      };

      // Act
      const result = service.populateLeaveDays(leave);

      // Assert
      expect(result.days).toBe(1);
    });

    it('should throw an error if "from" or "to" date is missing', () => {
      // Arrange
      const leave: Pick<
        LeaveEntity,
        'from' | 'to' | 'fromDayType' | 'toDayType'
      > = {
        from: undefined as any,
        to: '2022-09-05',
        fromDayType: LeaveDayType.FULL,
        toDayType: LeaveDayType.FULL,
      };

      // Act & Assert
      expect(() => service.populateLeaveDays(leave)).toThrow(
        'Leave from and to date is required',
      );
    });

    it('should throw an error if "fromDayType" or "toDayType" is missing', () => {
      // Arrange
      const leave: Pick<
        LeaveEntity,
        'from' | 'to' | 'fromDayType' | 'toDayType'
      > = {
        from: '2022-09-01',
        to: '2022-09-05',
        fromDayType: undefined as any,
        toDayType: LeaveDayType.FULL,
      };

      // Act & Assert
      expect(() => service.populateLeaveDays(leave)).toThrow(
        'Leave from and to day type is required',
      );
    });
  });
});
