import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { LeaveDayType, LeaveStatus, LeaveType } from '@art-city/common/enums';
import { ILeave } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.leave })
export class LeaveEntity extends BaseEntity implements ILeave {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'date' })
  from: string;

  @Column({ enum: LeaveDayType })
  fromDayType: LeaveDayType;

  @Column({ type: 'date' })
  to: string;

  @Column({ enum: LeaveDayType })
  toDayType: LeaveDayType;

  @Column({ type: 'int2' })
  days: number;

  @Column({ type: 'enum', enum: LeaveStatus })
  status: LeaveStatus;

  @Column({ type: 'enum', enum: LeaveType })
  type: LeaveType;

  @Column({ type: 'varchar' })
  reason: string;

  reviewerId?: string | undefined;

  @OneToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewerId' })
  reviewBy?: UserEntity | undefined;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt?: string | undefined;
}
