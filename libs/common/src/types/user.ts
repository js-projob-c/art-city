import { IEntity } from '.';
import { UserDepartment, UserRole } from '../enums';

export interface IUser extends IEntity {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: UserDepartment;
}
