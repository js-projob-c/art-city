import { Module } from '@nestjs/common';

import { ExternalPartyModule } from '../external-party/external-party.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [ExternalPartyModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
