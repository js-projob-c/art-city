import { IEntity } from '.';
import { ReimburseStatus, ReimburseType } from '../enums';

export interface IReimburse extends IEntity {
  id: string;
  userId: string;
  date: string;
  amount: number;
  description: string;
  type: ReimburseType;
  status: ReimburseStatus;
  supportDocument?: string;
}
