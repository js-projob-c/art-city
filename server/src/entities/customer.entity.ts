import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { CustomerSource, CustomerType } from '@art-city/common/enums';
import { ICustomer, IUser } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.customer })
export class CustomerEntity implements ICustomer {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;

  @ManyToMany(() => UserEntity, (user) => user.customers)
  users: IUser[];
}
