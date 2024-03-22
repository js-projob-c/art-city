import { IEntity } from '.';

export interface IUserCustomer extends IEntity {
  id: string;
  userId: string;
  customerId: string;
}
