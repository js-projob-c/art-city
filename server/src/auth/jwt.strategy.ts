import { IJwtPayload } from '@art-city/common/types';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/database/repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {
    const jwtReadConfig = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      issuer: configService.get('JWT_ISSUER'),
    };
    super(jwtReadConfig);
  }

  logger = new Logger(JwtStrategy.name);

  async validate(jwtPayload: IJwtPayload) {
    // this.logger.log('JWT validate');

    const user = await this.userRepo.findOneBy({
      id: jwtPayload?.sub,
    });

    // if (jwtPayload.role === JwtAccountType.ADMIN) {
    //   const admin = await this.adminsService.findOne({ id: jwtPayload.sub });
    //   if (admin)
    //     user = admin ? { ...admin, account_type: JwtAccountType.ADMIN } : admin;
    // } else {
    //   user = await this.membersService.findOne({
    //     id: jwtPayload.sub,
    //   });
    //   checkMembershipStatus(user?.membership_status);
    // }
    if (!user) {
      throw new UnauthorizedException();
    }
    return { payload: user, role: jwtPayload?.role };
  }
}
