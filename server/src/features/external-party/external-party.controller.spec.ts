import { Test, TestingModule } from '@nestjs/testing';

import { ExternalPartyController } from './external-party.controller';
import { ExternalPartyService } from './external-party.service';

describe('ExternalPartyController', () => {
  let controller: ExternalPartyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalPartyController],
      providers: [ExternalPartyService],
    }).compile();

    controller = module.get<ExternalPartyController>(ExternalPartyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
