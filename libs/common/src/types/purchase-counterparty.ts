import { BaseType } from '.';

export interface PurchaseCounterpartyType extends BaseType {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
}
