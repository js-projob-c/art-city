import { LeaveStatus, UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { ApproveLeaveRequestDto } from './dto/approveLeaveRequest.dto';
import { CreateLeaveRequestDto } from './dto/createLeaveRequest.dto';
import { UpdateLeaveRequestDto } from './dto/updateLeaveRequest.dto';
import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(
    private readonly leaveService: LeaveService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Post('application')
  async applyForLeave(
    @User() user: UserEntity,
    @Body() dto: CreateLeaveRequestDto,
  ) {
    await this.userService.validateAndGetUser(user.id);
    const payload = this.leaveService.populateLeaveDays(dto);
    await this.leaveService.createLeave(user.id, payload);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put('approval/:leaveId')
  async approveOrRejectLeave(
    @Param('leaveId') leaveId: string,
    @Body() dto: ApproveLeaveRequestDto,
  ) {
    await this.leaveService.validateLeaveStatus(leaveId, [LeaveStatus.PENDING]);
    await this.leaveService.approveOrRejectLeaveApplication(
      leaveId,
      dto.isApprove,
    );
  }

  @Put('application/:leaveId')
  async updateLeaveApplication(
    @Param('leaveId') leaveId: string,
    @Body() dto: UpdateLeaveRequestDto,
  ) {
    await this.leaveService.validateLeaveStatus(leaveId, [LeaveStatus.PENDING]);
    const payload = this.leaveService.populateLeaveDays(dto);
    await this.leaveService.updateLeave(leaveId, payload);
  }

  @Get('user')
  async getUserLeaves(
    @User() user: UserEntity,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    await this.userService.validateAndGetUser(user.id);
    await this.leaveService.getLeavesByUserId(
      user.id,
      parseInt(year),
      parseInt(month),
    );
  }

  @Get('/:userId')
  async getAllLeavesByUserId(
    @Param('userId') userId: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    await this.userService.validateAndGetUser(userId);
    await this.leaveService.getLeavesByUserId(
      userId,
      parseInt(year),
      parseInt(month),
    );
  }
}
