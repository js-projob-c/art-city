import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IBank } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.bank })
export class BankEntity extends BaseEntity implements IBank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  bank: string;

  @Column({ type: 'varchar' })
  account: string;
}
