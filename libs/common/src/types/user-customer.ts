import { BaseType } from '.';

export interface UserCustomerType extends BaseType {
  id: string;
  userId: string;
  customerId: string;
}
