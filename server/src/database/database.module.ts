import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { DatabaseConfig } from './database.config';
import { DatabaseService } from './database.service';
import * as Entities from './entities';
import * as Repositories from './repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      extraProviders: [DatabaseConfig],
      useFactory: (config: DatabaseConfig) => config.getTypeOrmConfig(),
    }),
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  providers: [DatabaseService, ...Object.values(Repositories), EntityManager],
  exports: [...Object.values(Repositories), EntityManager],
})
export class DatabaseModule {}
