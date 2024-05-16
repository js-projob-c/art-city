import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IAttendance, IUser } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.attendance })
export class AttendanceEntity extends BaseEntity implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.attendances, {
    onDelete: 'CASCADE',
  })
  user: IUser;

  @Column({ type: 'timestamp' })
  signInAt: string;

  @Column({ type: 'timestamp', nullable: true })
  signOutAt?: string | undefined;

  @Column({ type: 'time' })
  workHourFrom: string;

  @Column({ type: 'time', nullable: true })
  workHourTo: string;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  remarks?: string | undefined;
}
