import { ERROR_CODES } from '@art-city/common/constants';
import { IJwtTokenResponse } from '@art-city/common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entities';
import { UserRepository } from 'src/database/repositories';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(ERROR_CODES.AUTH.EMAIL_NOT_FOUND);
    }

    const isMatched = await this.checkHashedPassword(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedException(ERROR_CODES.AUTH.PASSWORD_INCORRECT);
    }

    return isMatched ? user : null;
  }

  async hashPassword(plainPassword: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
    return hashedPassword;
  }

  async checkHashedPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async signUserToken(user: UserEntity): Promise<IJwtTokenResponse> {
    const payload: Partial<IJwtTokenResponse> = {
      sub: user.id || '',
      email: user.email,
      role: user.role,
      department: user.department,
    };
    const token = await this.jwtService.signAsync(payload);
    const tokenPayload = await this.jwtService.verifyAsync(token);
    return { access_token: token, ...tokenPayload };
  }
}
