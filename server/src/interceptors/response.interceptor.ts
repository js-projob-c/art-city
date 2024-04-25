import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger = new Logger(ResponseTransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // const logger = new Logger(ResponseTransformInterceptor.name);

    return next.handle().pipe(
      map((data) => {
        if (data?.response_format === 'RAW') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { response_format, ...rest } = data;
          return rest;
        }

        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
      }),
    );
  }
}
