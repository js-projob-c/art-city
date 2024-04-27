import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ISystem } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.system })
export class SystemEntity extends BaseEntity implements ISystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  workHourFrom: string; // 24-hour format

  @Column({ type: 'time' })
  workHourTo: string; // 24-hour format
}
