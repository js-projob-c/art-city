import { ReimburseStatus, UserRole } from '@art-city/common/enums';
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
import { UserEntity } from 'src/entities';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { EntityManager } from 'typeorm';

import { ApproveReimburseApplicationRequestDto } from './dto/approve-reimburse-application-request.dto';
import { CreateReimburseApplicationRequestDto } from './dto/create-reimburse-application-request.dto';
import { ReimburseService } from './reimburse.service';

@UseGuards(new JwtAuthGuard())
@Controller('reimburse')
export class ReimburseController {
  constructor(private readonly reimburseService: ReimburseService) {}

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Post()
  async createReimburseApplication(
    @User() user: UserEntity,
    @Body() dto: CreateReimburseApplicationRequestDto,
  ) {
    return await this.reimburseService.createReimburseApplication(user.id, dto);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put(':reimburseId')
  async approveOrRejectReimburse(
    @Param('reimburseId') reimburseId: string,
    @Body() dto: ApproveReimburseApplicationRequestDto,
  ) {
    await this.reimburseService.validateReimburseStatus(reimburseId, [
      ReimburseStatus.PENDING,
    ]);
    await this.reimburseService.approveOrRejectReimburseApplication(
      reimburseId,
      dto.isApprove,
    );
  }

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Get('user')
  async getUserReimburse(
    @User() user: UserEntity,
    @Query('status') status: ReimburseStatus,
  ) {
    return await this.reimburseService.getReimbursesByUser(user.id, {
      ...(status && { status }),
    });
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Get()
  async getReimburses(
    @Query('userId') userId: string,
    @Query('status') status: ReimburseStatus,
  ) {
    return await this.reimburseService.getReimburses({
      ...(userId && {
        user: {
          id: userId,
        } as UserEntity,
      }),
      ...(status && { status }),
    });
  }
}
