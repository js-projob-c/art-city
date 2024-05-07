import { UserRole } from '@art-city/common/enums';
import { IUser } from '@art-city/common/types';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthGuard.name);
  constructor(
    private roles: UserRole[] | undefined = [...Object.values(UserRole)],
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(
    err,
    user: {
      payload: Partial<IUser>;
    },
    // info,
  ) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user?.payload) {
      throw err || new UnauthorizedException();
    }

    const hasPermission =
      this.roles && this.roles.some((role) => user.payload?.role === role);

    if (this.roles && !hasPermission) {
      this.logger.debug(
        `hasRight: ${hasPermission}. Required: ${this.roles}. Current: ${user.payload?.role}`,
      );
      throw new ForbiddenException();
    }
    return user.payload as any;
  }
}
