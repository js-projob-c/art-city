import { ShiftApplicationStatus, UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { UserService } from 'src/features/user/user.service';

import { ApproveShiftApplicationRequestDto } from '../../../../libs/common/src/dto/shift-application/approve-shift-application-request.dto';
import { CreateShiftApplicationRequestDto } from '../../../../libs/common/src/dto/shift-application/create-shift-application-request.dto';
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
    await this.shiftApplicationService.validateShiftFromDateNonExisted(
      user.id,
      dto.fromDate,
    );
    await this.shiftApplicationService.validateShiftToDateNonExisted(
      user.id,
      dto.toDate,
    );
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
      dto.isApprove,
      user.id,
    );
  }

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Get('user')
  async getUserShiftApplications(@User() user: UserEntity) {
    return await this.shiftApplicationService.getShiftApplicationsByUserId(
      user.id,
    );
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  async getShiftApplications(@Query('userId') userId: string) {
    return await this.shiftApplicationService.getShiftApplications({
      ...(userId && { user: { id: userId } as UserEntity }),
    });
  }

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.ADMIN]))
  @Delete(':shiftApplicationId')
  async deleteShiftApplication(
    @User() user: UserEntity,
    @Param('shiftApplicationId') shiftApplicationId: string,
  ) {
    if (user.role !== UserRole.ADMIN) {
      await this.shiftApplicationService.validateShiftApplicationOwnership(
        shiftApplicationId,
        user.id,
      );
    }
    await this.shiftApplicationService.deleteShiftApplication(
      shiftApplicationId,
    );
  }
}
