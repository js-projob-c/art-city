import { UserRole } from '@art-city/common/enums';
import { UserUtil } from '@art-city/common/utils/user.util';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { UserService } from 'src/features/user/user.service';

import { CreateScheduleRequestDto } from './dto/create-schedule-request.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Post()
  async userCreateSchedule(@Body() dto: CreateScheduleRequestDto) {
    await this.userService.validateAndGetUser(dto?.userId);
    return await this.scheduleService.batchCreateSchedule(
      dto.userId,
      dto.dates,
    );
  }

  // @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  // @Get('user')
  // async getUserSchedules(@User() user: UserEntity) {
  //   return await this.scheduleService.getSchedules(user.id);
  // }

  @UseGuards(new JwtAuthGuard())
  @Get()
  async getSchedules(
    @User() user: UserEntity,
    @Query('userId') userId: string,
  ) {
    const targetUserId = UserUtil.checkRoleAndOverrideUserId(user, userId);
    return await this.scheduleService.getSchedules(targetUserId);
  }
}
