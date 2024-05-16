import { Test, TestingModule } from '@nestjs/testing';

import { ExternalProjectService } from './external-project.service';

describe('ExternalProjectService', () => {
  let service: ExternalProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalProjectService],
    }).compile();

    service = module.get<ExternalProjectService>(ExternalProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
