import { UserEntity } from '../../../../server/src/database/entities';
import { UserRole } from '../enums';

export class UserUtil {
  static isUserAdmin(user: UserEntity) {
    return user.role === UserRole.ADMIN;
  }
  static isUserEmployee(user: UserEntity) {
    return user.role === UserRole.EMPLOYEE;
  }
  static isUserManager(user: UserEntity) {
    return user.role === UserRole.MANAGER;
  }

  static checkRoleAndOverrideUserId(
    user: UserEntity,
    userId: string,
    overrideRoles: UserRole[] = [UserRole.EMPLOYEE],
  ) {
    if (!userId || overrideRoles.includes(user.role)) {
      return user.id;
    }
    return userId;
  }
}
