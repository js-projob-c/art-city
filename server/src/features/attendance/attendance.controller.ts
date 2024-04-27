import { Controller, Post, Req } from '@nestjs/common';

import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('sign')
  async sign(@Req() req: any) {
    const user = req.user;
    return await this.attendanceService.signInOrOutByUser(user?.id);
  }
}
