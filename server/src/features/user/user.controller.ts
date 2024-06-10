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
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';

import { GetUserResponseDto } from '../../../../libs/common/src/dto/user/get-user-response.dto';
import { UpdateUserRequestDto } from '../../../../libs/common/src/dto/user/update-user-request.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get('search')
  async search(
    @Query('role') role: UserRole,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.search({ ...(role && { role }) }, { page, limit });
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  async findAll(@Query('role') role: UserRole) {
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
  ) {
    const { monthlySalary, annualLeave, ...userPayload } = dto;
    await this.userService.updateUser(userId, userPayload, {
      monthlySalary,
      annualLeave,
    });
  }
}
