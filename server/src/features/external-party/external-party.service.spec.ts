import { Test, TestingModule } from '@nestjs/testing';

import { ExternalPartyService } from './external-party.service';

describe('ExternalPartyService', () => {
  let service: ExternalPartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalPartyService],
    }).compile();

    service = module.get<ExternalPartyService>(ExternalPartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
