import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/database/entities';

export const TokenUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return null;

    return user;
  },
);
