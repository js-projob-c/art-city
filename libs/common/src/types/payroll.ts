import { PayrollType } from '../enums';
import { IEntity } from '.';

export interface IPayroll extends IEntity {
  id: string;
  userId: string;
  amount: number;
  paidAt: string;
  type: PayrollType;
}
