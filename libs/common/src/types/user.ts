import { BaseType } from '.';
import { UserDepartment, UserRole } from '../enums';

export interface UserType extends BaseType {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: UserDepartment;
}
