import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IAttendance, IUser } from '@art-city/common/types';
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

@Entity({ name: DB_TABLE_NAMES.attendance })
export class AttendanceEntity implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.attendances)
  user: IUser;

  @Column({ type: 'timestamp' })
  signInAt: string;

  @Column({ type: 'timestamp', nullable: true })
  signOutAt?: string | undefined;

  @Column({ type: 'timestamp' })
  workHourFrom: string;

  @Column({ type: 'timestamp' })
  workHourTo: string;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
