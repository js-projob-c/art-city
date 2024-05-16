import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

import * as Entities from '../entities';

const entities = Object.values(Entities);

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const migrationPaths = ['dist/server/src/external/database/migrations/*.js'];

export const migrationDatasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_LOCALHOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.DATABASE_SCHEMA_NAME,
  entities,
  logging: true,
  migrationsTableName: 'migration',
  // typeorm-ts-node-esm does not support ts path mapping
  migrations: migrationPaths,
});
