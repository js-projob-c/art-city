import { IErrorResponse } from '@art-city/common/types';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ErrorResponseEntity } from '../exceptions/ErrorResponseEntity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const payload = exception.getResponse();

    const mappedPayload: IErrorResponse = {
      message: null,
      code: null,
      statusCode: 0,
      path: request.url,
    };

    if (payload instanceof ErrorResponseEntity) {
      const built = payload.build();
      mappedPayload.code = built.code;
      mappedPayload.message = built.message;
      mappedPayload.statusCode = status;
    } else {
      reply.status(500).send({
        code: null,
        message: null,
        statusCode: 500,
        path: mappedPayload.path,
      });
    }

    reply.status(status).send({
      code: mappedPayload?.code,
      message: mappedPayload?.message,
      statusCode: mappedPayload.statusCode,
      path: mappedPayload.path,
    });
  }
}
