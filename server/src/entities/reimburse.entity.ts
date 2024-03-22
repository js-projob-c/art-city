import { ReimburseStatus, ReimburseType } from '@art-city/common/enums';
import { IReimburse, IUser } from '@art-city/common/types';
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

@Entity({ name: 'reimburse' })
export class ReimburseEntity implements IReimburse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.reimburses)
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ReimburseType })
  type: ReimburseType;

  @Column({ type: 'enum', enum: ReimburseStatus })
  status: ReimburseStatus;

  @Column({ type: 'varchar', nullable: true })
  supportDocument?: string | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
