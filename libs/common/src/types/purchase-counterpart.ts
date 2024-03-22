import { IEntity } from '.';

export interface IPurchaseCounterpart extends IEntity {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
}
