import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/database/entities';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';

import { GetUserResponseDto } from './dto/get-user-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  findAll(@Query('role') role: UserRole) {
    return this.userService.findAll({ ...(role && { role }) });
  }

  @UseGuards(
    new JwtAuthGuard([UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE]),
  )
  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<GetUserResponseDto> {
    const user = await this.userService.getOneUserById(userId);
    return plainToInstance(GetUserResponseDto, user);
  }

  @UseGuards(
    new JwtAuthGuard([UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE]),
  )
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserEntity | null> {
    const { monthlySalary, annualLeave, ...userPayload } = dto;
    await this.userService.createOrUpdateUserDetails(userId, {
      monthlySalary,
      annualLeave,
    });
    const user = await this.userService.updateOneUserById(userId, userPayload);
    return user;
  }
}
