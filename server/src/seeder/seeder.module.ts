import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from 'src/features/auth/auth.module';

import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [AuthModule],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    // await this.seederService.resetTables();
    // await this.seederService.seedTables();
  }
}
