import { Module } from '@nestjs/common';

import { ExternalPartyController } from './external-party.controller';
import { ExternalPartyService } from './external-party.service';

@Module({
  controllers: [ExternalPartyController],
  providers: [ExternalPartyService],
})
export class ExternalPartyModule {}
