import { ERROR_CODES } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRepository } from 'src/database/repositories';
import { TokenUser } from 'src/decorators';
import { UserEntity } from 'src/database/entities';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import { RegisterRequestDto } from './dto/RegisterRequest.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new BadRequestException(ERROR_CODES.AUTH.EMAIL_EXISTED);
    }

    const hashedPassword = await this.authService.hashPassword(dto.password);

    await this.userRepo.save(
      this.userRepo.create({
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: UserRole.ADMIN,
        department: UserDepartment.ADMIN,
      }),
    );
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginRequestDto,
  })
  @Post('login')
  async login(@TokenUser() user: UserEntity) {
    const token = await this.authService.signUserToken(user);
    return token;
  }
}
