import { IEntity } from '.';

export interface IExternalParty extends IEntity {
  id: string;
  company: string;
  contactName: string;
  contactRole: string;
  email?: string;
  phone?: string;
}
