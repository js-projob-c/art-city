import { CustomerSource, CustomerType } from '@art-city/common/enums';
import { ICustomer } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
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
}
