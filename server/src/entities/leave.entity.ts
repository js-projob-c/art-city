import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { LeaveStatus } from '@art-city/common/enums';
import { ILeave, IUser } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.leave })
export class LeaveEntity implements ILeave {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @Column({ type: 'timestamp' })
  from: string;

  @Column({ type: 'timestamp' })
  to: string;

  @Column({ type: 'int2' })
  days: number;

  @Column({ type: 'enum', enum: LeaveStatus })
  status: LeaveStatus;

  @Column({ type: 'varchar' })
  reason: string;

  reviewerId?: string | undefined;

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'reviewerId' })
  reviewBy?: IUser | undefined;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt?: string | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
