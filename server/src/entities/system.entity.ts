import { ISystem } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SystemEntity implements ISystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  workHourFrom: string;

  @Column({ type: 'datetime' })
  workHourTo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
