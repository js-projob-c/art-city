import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ShiftApplicationStatus } from '@art-city/common/enums';
import { IShiftApplication } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.shiftApplication })
export class ShiftApplicationEntity
  extends BaseEntity
  implements IShiftApplication
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.shiftApplications)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'date' })
  fromDate: string;

  @Column({ type: 'date' })
  toDate: string;

  @Column({ type: 'varchar', nullable: true })
  reason?: string | undefined;

  @Column({ type: 'enum', enum: ShiftApplicationStatus })
  status: ShiftApplicationStatus;

  reviewerId?: string | undefined;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reviewerId' })
  reviewBy?: UserEntity | undefined;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt?: string | undefined;
}
