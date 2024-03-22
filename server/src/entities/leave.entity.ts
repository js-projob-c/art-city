import { LeaveStatus } from '@art-city/common/enums';
import { ILeave, IUser } from '@art-city/common/types';
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

@Entity({ name: 'leave' })
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
  applyReason: string;

  @Column({ type: 'varchar', nullable: true })
  approvedBy?: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  rejectedBy?: string | undefined;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt?: string;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
