import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationRequestDto => {
    const request = ctx.switchToHttp().getRequest();
    return {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 0,
    };
  },
);
