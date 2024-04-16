import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Entities from '../entities';
import { DatabaseConfig } from './database.config';
import { DatabaseService } from './database.service';
import * as Repositories from './repositories';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      extraProviders: [DatabaseConfig],
      useFactory: (config: DatabaseConfig) => config.getTypeOrmConfig(),
    }),
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  providers: [DatabaseService, ...Object.values(Repositories)],
  exports: [UserRepository, ...Object.values(Repositories)],
})
export class DatabaseModule {}
