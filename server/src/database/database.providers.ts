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
      dataSource.getRepository(AttendanceEntity).manager,
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.bank,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BankEntity).manager,
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.customer,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomerEntity).manager,
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.externalParty,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExternalPartyEntity).manager,
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.externalProject,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExternalProjectEntity).manager,
    inject: [DataSource],
  },
  {
    provide: DB_TABLE_NAMES.user,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity).manager,
    inject: [DataSource],
  },
];
