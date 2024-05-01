import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

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
});
