import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { ShiftApplicationController } from './shift-application.controller';
import { ShiftApplicationService } from './shift-application.service';

describe('ShiftApplicationController', () => {
  let controller: ShiftApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftApplicationController],
      providers: [ShiftApplicationService],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ShiftApplicationController>(
      ShiftApplicationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
