import { ShiftApplicationStatus, UserRole } from '@art-city/common/enums';
import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/entities';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { UserService } from 'src/features/user/user.service';

import { ApproveShiftApplicationRequestDto } from './dto/approve-shift-application-request.dto';
import { CreateShiftApplicationRequestDto } from './dto/create-shift-application-request.dto';
import { ShiftApplicationService } from './shift-application.service';

@Controller('shift-application')
export class ShiftApplicationController {
  constructor(
    private readonly shiftApplicationService: ShiftApplicationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Post('user')
  async createShiftApplication(
    @User() user: any,
    @Body() dto: CreateShiftApplicationRequestDto,
  ) {
    await this.userService.validateAndGetUser(user?.id);
    return await this.shiftApplicationService.createShiftApplication(
      user.id,
      dto,
    );
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put('approval/:shiftApplicationId')
  async approveOrRejectShiftApplication(
    @User() user: UserEntity,
    @Param('shiftApplicationId') shiftApplicationId: string,
    @Body() dto: ApproveShiftApplicationRequestDto,
  ) {
    await this.shiftApplicationService.validateShiftApplicationStatus(
      shiftApplicationId,
      [ShiftApplicationStatus.PENDING],
    );
    await this.shiftApplicationService.approveShiftApplication(
      shiftApplicationId,
      {
        status: dto.isApprove
          ? ShiftApplicationStatus.APPROVED
          : ShiftApplicationStatus.REJECTED,
      },
    );
  }
}
