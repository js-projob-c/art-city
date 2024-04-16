import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { SwaggerService } from './swagger/swagger.service';

const apiPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.setGlobalPrefix(apiPrefix);

  const configService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV', { infer: true });

  if (environment !== 'production') {
    const swaggerService = app.get(SwaggerService);
    swaggerService.path = 'swagger';
    swaggerService.run(app);
  }

  await app.listen(8080, '0.0.0.0');
  const url = await app.getUrl();
  logger.log(`Server listening on ${url}`);
}
bootstrap();
