import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { JwtVariables } from './jwt.variables';

@Injectable()
export class JwtConfiguration {
  constructor(private configService: ConfigService<JwtVariables>) {}

  public getConfig() {
    return {
      secret: this.jwtSecret,
      signOptions: {
        expiresIn: this.exiresIn,
        issuer: this.jwtIssuer,
      },
    };
  }

  get jwtSecret(): string | undefined {
    return this.configService.get('JWT_SECRET', {
      infer: true,
    });
  }

  get jwtIssuer(): string | undefined {
    return this.configService.get('JWT_ISSUER', {
      infer: true,
    });
  }

  get exiresIn(): string {
    return '180 days';
  }
}
