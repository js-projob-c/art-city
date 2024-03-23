import { UserDepartment, UserRole } from '../enums';
import { IEntity } from '.';

export interface IUser extends IEntity {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: UserDepartment;
}
