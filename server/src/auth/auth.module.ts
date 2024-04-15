import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfiguration } from './jwt.configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory(config: JwtConfiguration) {
        return config.getConfig();
      },
      inject: [JwtConfiguration],
      extraProviders: [JwtConfiguration],
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
