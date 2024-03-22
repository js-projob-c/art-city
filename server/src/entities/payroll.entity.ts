import { PayrollType } from '@art-city/common/enums';
import { IPayroll, IUser } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'payroll' })
export class PayrollEntity implements IPayroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.payrolls)
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'timestamp' })
  paidAt: string;

  @Column({ type: 'enum', enum: PayrollType })
  type: PayrollType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
