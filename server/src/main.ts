import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response.interceptor';
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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const result = errors.reduce((acc, error) => {
          return {
            ...acc,
            [error.property]: Object.entries(error.constraints ?? {}).map(
              ([key, value]) => ({ contraint: key, message: value }),
            ),
          };
        }, {});
        return new BadRequestException(result);
      },
    }),
  );
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV', { infer: true });

  if (environment !== 'production') {
    const swaggerService = app.get(SwaggerService);
    swaggerService.path = 'swagger';
    swaggerService.run(app);
  }

  const port = configService.get<{ PORT: number }>('PORT', { infer: true });

  await app.listen(port || 8080, '0.0.0.0');
  const url = await app.getUrl();
  logger.log(`Server listening on ${url}`);
}
bootstrap();
