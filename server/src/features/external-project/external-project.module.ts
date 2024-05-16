import { Module } from '@nestjs/common';

import { ExternalPartyModule } from '../external-party/external-party.module';
import { ExternalProjectController } from './external-project.controller';
import { ExternalProjectService } from './external-project.service';

@Module({
  imports: [ExternalPartyModule],
  controllers: [ExternalProjectController],
  providers: [ExternalProjectService],
})
export class ExternalProjectModule {}
