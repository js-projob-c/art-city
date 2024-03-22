import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
