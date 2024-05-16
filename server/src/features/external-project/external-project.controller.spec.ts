import { Test, TestingModule } from '@nestjs/testing';

import { ExternalProjectController } from './external-project.controller';
import { ExternalProjectService } from './external-project.service';

describe('ExternalProjectController', () => {
  let controller: ExternalProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalProjectController],
      providers: [ExternalProjectService],
    }).compile();

    controller = module.get<ExternalProjectController>(
      ExternalProjectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
