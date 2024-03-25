import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ISystem } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.system })
export class SystemEntity implements ISystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  workHourFrom: string;

  @Column({ type: 'timestamp' })
  workHourTo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
