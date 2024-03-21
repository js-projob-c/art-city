import { CustomerSource } from '../enums/customer';
import { BaseType } from './';

export interface CustomerType extends BaseType {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  source: CustomerSource;
  type: CustomerType;
}
