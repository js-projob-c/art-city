import { DB_TABLE_NAMES } from '@art-city/common/constants';
import {
  AttendanceEntity,
  BankEntity,
  CustomerEntity,
  ExternalPartyEntity,
  ExternalProjectEntity,
  UserEntity,
} from 'src/entities';
import { DataSource } from 'typeorm';

export const repositoriesProviders = [
  {
    provide: DB_TABLE_NAMES.attendance,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(AttendanceEntity),
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.bank,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(BankEntity),
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.customer,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(CustomerEntity),
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.externalParty,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(ExternalPartyEntity),
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.externalProject,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(ExternalProjectEntity),
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.user,
    useFactory: (dataSource: DataSource) =>
      dataSource.manager.getRepository(UserEntity),
    inject: [DataSource],
  },
];
