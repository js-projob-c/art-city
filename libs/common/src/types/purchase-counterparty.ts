import { IEntity } from '.';

export interface IPurchaseCounterparty extends IEntity {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
}
