import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { LeaveStatus, UserRole } from '@art-city/common/enums';
import { UserUtil } from '@art-city/common/utils/user.util';
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
import { Pagination, User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';

import { ApproveLeaveRequestDto } from '../../../../libs/common/src/dto/leave/approveLeaveRequest.dto';
import { CreateLeaveRequestDto } from '../../../../libs/common/src/dto/leave/createLeaveRequest.dto';
import { UpdateLeaveRequestDto } from '../../../../libs/common/src/dto/leave/updateLeaveRequest.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
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

  // @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  // @Get('user')
  // async getUserLeaves(
  //   @User() user: UserEntity,
  //   @Query('year') year: string,
  //   @Query('month') month: string,
  // ) {
  //   await this.userService.validateAndGetUser(user.id);
  //   return await this.leaveService.getLeavesByUserId(
  //     user.id,
  //     parseInt(year),
  //     parseInt(month),
  //   );
  // }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get('search')
  async search(
    @Query('role') role: UserRole,
    @Pagination() paginationDto: PaginationRequestDto,
  ) {
    return this.leaveService.search({}, paginationDto);
  }

  @UseGuards(new JwtAuthGuard())
  @Get()
  async getLeaves(
    @User() user: UserEntity,
    @Query('userId') userId: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    const targetUserId = UserUtil.checkRoleAndOverrideUserId(user, userId);
    await this.userService.validateAndGetUser(targetUserId);
    return await this.leaveService.getLeavesByUserId(
      targetUserId,
      parseInt(year),
      parseInt(month),
    );
  }
}
