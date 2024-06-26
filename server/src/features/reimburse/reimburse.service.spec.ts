import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { ReimburseService } from './reimburse.service';

describe('ReimburseService', () => {
  let service: ReimburseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReimburseService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ReimburseService>(ReimburseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
