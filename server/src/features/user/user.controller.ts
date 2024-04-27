import { UserRole } from '@art-city/common/enums';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
