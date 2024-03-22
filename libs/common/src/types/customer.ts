import { CustomerSource, CustomerType } from '../enums/customer';
import { IEntity } from './';

export interface ICustomer extends IEntity {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  source: CustomerSource;
  type: CustomerType;
}
