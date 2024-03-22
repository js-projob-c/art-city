import { AttendanceType, UserType } from '@art-city/common/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class AttendanceEntity implements AttendanceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.attendance)
  user: UserType;

  @Column({ type: 'datetime' })
  signInAt: string;

  @Column({ type: 'datetime', nullable: true })
  signOutAt?: string | undefined;

  @Column({ type: 'datetime' })
  workHourFrom: string;

  @Column({ type: 'datetime' })
  workHourTo: string;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
