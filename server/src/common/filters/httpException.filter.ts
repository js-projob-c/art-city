import { IErrorResponse } from '@art-city/common/types';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ErrorResponseEntity } from '../exceptions/ErrorResponseEntity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const payload: any = exception.getResponse();

    const mappedPayload: IErrorResponse = {
      message: [],
      code: null,
      statusCode: 0,
      path: request.url,
      fields: payload?.fields ?? [],
    };

    if (payload instanceof ErrorResponseEntity) {
      const built = payload.build();
      mappedPayload.code = built.code;
      mappedPayload.message = built.message
        ? Array.isArray(built.message)
          ? built.message
          : [built.message]
        : [];
      mappedPayload.statusCode = status;
    } else {
      mappedPayload.code = null;
      mappedPayload.message = mappedPayload.message
        ? Array.isArray(mappedPayload.message)
          ? mappedPayload.message
          : [mappedPayload.message]
        : [];
      mappedPayload.statusCode = status;
    }

    this.logger.error(mappedPayload);
    reply.status(status).send({
      code: mappedPayload?.code,
      message: mappedPayload?.message,
      statusCode: mappedPayload.statusCode ?? 500,
      path: mappedPayload.path,
      fields: mappedPayload.fields,
    });
  }
}
