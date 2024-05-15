import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DatabaseVariables } from './database.variables';
// import { ProjectSubscriber } from './subscribers';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService<DatabaseVariables>) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      schema: this.schema,
      logging: this.logging,
      migrationsTableName: this.migrationTableName,
      migrations: ['dist/server/src/external/database/migrations/*.js'],
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      // subscribers: [ProjectSubscriber],
    };
  }

  get host(): string {
    return this.configService.getOrThrow('POSTGRES_HOST', {
      infer: true,
    });
  }

  get port(): number {
    return this.configService.getOrThrow('POSTGRES_PORT', {
      infer: true,
    });
  }

  get username(): string {
    return this.configService.getOrThrow('POSTGRES_USER', {
      infer: true,
    });
  }

  get password(): string {
    return this.configService.getOrThrow('POSTGRES_PASSWORD', {
      infer: true,
    });
  }

  get database(): string {
    return this.configService.getOrThrow('POSTGRES_DB', {
      infer: true,
    });
  }

  get logging(): boolean {
    return this.configService.get('ENABLE_DB_LOG', false, {
      infer: true,
    });
  }

  get schema(): string {
    return this.configService.getOrThrow('DATABASE_SCHEMA_NAME', {
      infer: true,
    });
  }

  get migrationTableName(): string {
    return 'migration';
  }
}
