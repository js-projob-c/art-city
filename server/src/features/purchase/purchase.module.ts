import { Module } from '@nestjs/common';

import { ExternalPartyModule } from '../external-party/external-party.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [ExternalPartyModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
