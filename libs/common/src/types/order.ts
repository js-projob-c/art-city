import { ExternalPartyCustomerType } from '../enums';
import { IEntity } from './base';

export interface IOrderPartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string;
  phone?: string;
  customerSource: string;
  customerType: ExternalPartyCustomerType;
}

export interface IOrderItem {
  name: string;
  amount: number;
  quantity: number;
}

export interface IOrder extends IEntity {
  id: string;
  externalPartyDetails: IOrderPartyDetails;
  items: IOrderItem[];
  totalAmount: number;
  orderDate: string;
}
