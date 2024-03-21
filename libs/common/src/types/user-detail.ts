import { BaseType } from '.';

export interface UserDetailType extends BaseType {
  id: string;
  userId: string;
  monthlySalary: number;
  annualLeave: number;
}
