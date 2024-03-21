import { BaseType } from '.';
import { ReimburseStatus } from '../enums';

export interface ReimburseType extends BaseType {
  id: string;
  userId: string;
  date: string;
  amount: number;
  description: string;
  type: ReimburseType;
  status: ReimburseStatus;
  supportDocument?: string;
}
