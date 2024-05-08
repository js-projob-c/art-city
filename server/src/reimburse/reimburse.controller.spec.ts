import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { ReimburseController } from './reimburse.controller';
import { ReimburseService } from './reimburse.service';

describe('ReimburseController', () => {
  let controller: ReimburseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReimburseController],
      providers: [ReimburseService],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ReimburseController>(ReimburseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
