import { IUser } from '@art-city/common/types';

export class CreateUserDto implements Pick<IUser, 'email' | 'password'> {
  email: string;
  password: string;
}
