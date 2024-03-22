import { IEntity } from '.';
import { PurchaseStatus } from '../enums';

export interface IPurchaseItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IPurchase extends IEntity {
  id: string;
  counterpartyId: string;
  description: string;
  items: IPurchaseItem[];
  status: PurchaseStatus;
  amount: number;
}
