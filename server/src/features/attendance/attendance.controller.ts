import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/common/decorators';
import { UserEntity } from 'src/entities';

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

  @UseGuards(new JwtAuthGuard([UserRole.EMPLOYEE]))
  @Get('employee')
  async getEmployeeAttendances(
    @Req() req: any,
    @User() user: UserEntity,
  ): Promise<GetAttendanceResponseDto[]> {
    const attendances = await this.attendanceService.getAttendanceByUser(
      user.id,
    );
    const attendancesWithStatus = attendances.map((attendance) => {
      const status = this.attendanceService.getAttendanceStatus(attendance);
      return { ...attendance, status };
    });
    return plainToInstance(GetAttendanceResponseDto, attendancesWithStatus);
  }

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
