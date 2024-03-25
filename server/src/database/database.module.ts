import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import * as Entities from '../entities';
import { DatabaseConfiguration } from './database.configuration';
import { DatabaseService } from './database.service';
import * as Repositories from './repositories';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfiguration],
      extraProviders: [DatabaseConfiguration],
      useFactory: (config: DatabaseConfiguration) => config.getTypeOrmConfig(),
    }),
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  providers: [DatabaseService, ...Object.values(Repositories)],
  exports: [UserRepository, ...Object.values(Repositories)],
})
export class DatabaseModule {}
