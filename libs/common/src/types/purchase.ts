import { BaseType } from '.';
import { PurchaseStatus } from '../enums';

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PurchaseType extends BaseType {
  id: string;
  counterpartyId: string;
  description: string;
  items: PurchaseItem[];
  status: PurchaseStatus;
  amount: number;
}
