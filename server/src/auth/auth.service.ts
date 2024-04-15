import { IJwtTokenResponse, IUser } from '@art-city/common/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repositories';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userRepo.find({
      where: {
        email,
      },
    });
    return user;
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

  async signUserToken(user: IUser): Promise<IJwtTokenResponse> {
    const payload = {
      role: user.role,
      sub: user.id || '',
    };
    const token = await this.jwtService.signAsync(payload);
    const tokenPayload = await this.jwtService.verifyAsync(token);
    return { access_token: token, ...tokenPayload };
  }
}
