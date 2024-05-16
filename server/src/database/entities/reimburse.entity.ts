import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ReimburseStatus, ReimburseType } from '@art-city/common/enums';
import { IReimburse, IUser } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.reimburse })
export class ReimburseEntity extends BaseEntity implements IReimburse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.reimburses)
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ReimburseType })
  type: ReimburseType;

  @Column({ type: 'enum', enum: ReimburseStatus })
  status: ReimburseStatus;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;
}
