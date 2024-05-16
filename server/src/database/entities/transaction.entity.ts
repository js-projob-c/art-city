import { TransactionType } from '@art-city/common/enums';
import { ITransaction } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TransactionEntity extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'date' })
  transactionDate: string;

  @Column({ enum: TransactionType })
  type: TransactionType;
}
