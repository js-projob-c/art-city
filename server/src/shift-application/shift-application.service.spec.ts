import { Test, TestingModule } from '@nestjs/testing';

import { ShiftApplicationService } from './shift-application.service';

describe('ShiftApplicationService', () => {
  let service: ShiftApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftApplicationService],
    }).compile();

    service = module.get<ShiftApplicationService>(ShiftApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
