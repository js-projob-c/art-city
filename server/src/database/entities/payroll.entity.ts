import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { PayrollType } from '@art-city/common/enums';
import { IPayroll } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.payroll })
export class PayrollEntity extends BaseEntity implements IPayroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.payrolls, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'timestamp' })
  paidAt: string;

  @Column({ type: 'enum', enum: PayrollType })
  type: PayrollType;
}
