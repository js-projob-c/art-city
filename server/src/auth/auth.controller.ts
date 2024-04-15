import { errorCodes } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories';

import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/RegisterRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterRequestDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new BadRequestException(errorCodes.REGISTER_EMAIL_EXISTED);
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

  @Post('/login')
  async login() {}
}
