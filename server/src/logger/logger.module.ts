import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true, ignore: 'req.headers' },
        },
      },
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
