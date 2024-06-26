import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { CustomerSource, CustomerType } from '@art-city/common/enums';
import { ICustomer } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.customer })
export class CustomerEntity extends BaseEntity implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'enum', enum: CustomerSource })
  source: CustomerSource;

  @Column({ type: 'enum', enum: CustomerSource })
  type: CustomerType;

  @ManyToMany(() => UserEntity, (user) => user.customers, {
    onDelete: 'SET NULL',
  })
  users: UserEntity[];
}
