import { TransactionType } from '../enums';
import { IEntity } from '.';

export interface ITransaction extends IEntity {
  id: string;
  name: string;
  description: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
}
