import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ShiftApplicationStatus } from '@art-city/common/enums';
import { IShiftApplication, IUser } from '@art-city/common/types';
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

@Entity({ name: DB_TABLE_NAMES.shiftApplication })
export class ShiftApplicationEntity implements IShiftApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @Column({ type: 'timestamp' })
  fromDate: string;

  @Column({ type: 'timestamp' })
  toDate: string;

  @Column({ type: 'int2' })
  days: number;

  @Column({ type: 'varchar', nullable: true })
  reason?: string | undefined;

  @Column({ type: 'enum', enum: ShiftApplicationStatus })
  status: ShiftApplicationStatus;

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
