import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { UserRole } from '@art-city/common/enums';
import { UserUtil } from '@art-city/common/utils/user.util';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AttendanceStatusCreator } from 'src/common/class/misc/attendanceStatusCreator';
import { Pagination, User } from 'src/common/decorators';
import { UserEntity } from 'src/database/entities';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttendanceService } from './attendance.service';
import { GetAttendanceResponseDto } from './dto/getAttendanceResponse.dto';
import { UpdateAttendanceRequestDto } from './dto/updateAttendanceRequest.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Post('sign')
  async sign(@Req() req: any) {
    const user = req.user;
    return await this.attendanceService.signInOrOutByUser(user?.id);
  }

  @SerializeOptions({ excludeExtraneousValues: true })
  @UseGuards(new JwtAuthGuard())
  @Get()
  async getUserAttendances(
    @User() user: UserEntity,
    @Query('userId') userId: string,
  ): Promise<GetAttendanceResponseDto[]> {
    const targetUserId = UserUtil.checkRoleAndOverrideUserId(user, userId);
    const attendances =
      await this.attendanceService.getAttendanceByUser(targetUserId);
    const attendancesWithStatus = attendances.map((attendance) => {
      const status = new AttendanceStatusCreator(attendance).createStatus();
      return { ...attendance, status };
    });
    return plainToInstance(GetAttendanceResponseDto, attendancesWithStatus);
  }

  @SerializeOptions({ excludeExtraneousValues: true })
  @UseGuards(new JwtAuthGuard())
  @Get('search')
  async searchUserAttendances(
    @User() user: UserEntity,
    @Query('userId') userId: string,
    @Pagination() paginationDto: PaginationRequestDto,
  ) {
    const targetUserId = UserUtil.checkRoleAndOverrideUserId(user, userId);
    const { data, pagination } = await this.attendanceService.searchByUser(
      targetUserId,
      {},
      paginationDto,
    );
    const attendancesWithStatus = data.map((attendance) => {
      const status = new AttendanceStatusCreator(attendance).createStatus();
      return { ...attendance, status };
    });
    return {
      data: plainToInstance(GetAttendanceResponseDto, attendancesWithStatus),
      pagination,
    };
  }

  // @SerializeOptions({ excludeExtraneousValues: true })
  // @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  // @Get('/:userId')
  // async getAttendancesByUserId(
  //   @Param('userId') userId: string,
  // ): Promise<GetAttendanceResponseDto[]> {
  //   const attendances =
  //     await this.attendanceService.getAttendanceByUser(userId);
  //   const attendancesWithStatus = attendances.map((attendance) => {
  //     const status = this.attendanceService.getAttendanceStatus(attendance);
  //     return { ...attendance, status };
  //   });
  //   return plainToInstance(GetAttendanceResponseDto, attendancesWithStatus);
  // }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put(':attendanceId')
  async updateAttendance(
    @Param('attendanceId') attendanceId: string,
    @Body() dto: UpdateAttendanceRequestDto,
  ) {
    // TODO: upload supporting document and populate
    return await this.attendanceService.updateAttendance(attendanceId, dto);
  }
}
