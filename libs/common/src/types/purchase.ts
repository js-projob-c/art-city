import { PurchaseStatus } from '../enums';
import { IEntity } from '.';

export interface IPurchaseItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IPurchasePartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string;
  phone?: string;
}

export interface IPurchase extends IEntity {
  id: string;
  // externalPartyId: string;
  externalPartyDetails: IPurchasePartyDetails;
  description: string;
  items: IPurchaseItem[];
  status: PurchaseStatus;
  amount: number;
}
