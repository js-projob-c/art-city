import { IEntity } from '.';

export interface IUserDetail extends IEntity {
  id: string;
  userId: string;
  monthlySalary: number;
  annualLeave: number;
}
