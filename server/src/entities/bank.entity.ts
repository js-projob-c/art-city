import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IBank } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.bank })
export class BankEntity implements IBank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  bank: string;

  @Column({ type: 'varchar' })
  account: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
