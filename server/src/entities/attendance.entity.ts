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
  @ManyToOne(() => UserEntity, (user) => user.attendances)
  user: IUser;

  @Column({ type: 'timestamptz' })
  signInAt: string;

  @Column({ type: 'timestamptz', nullable: true })
  signOutAt?: string | undefined;

  @Column({ type: 'timestamptz' })
  workHourFrom: string;

  @Column({ type: 'timestamptz' })
  workHourTo: string;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;
}
