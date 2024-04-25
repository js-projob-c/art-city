import { Body, Controller, Get, Post } from '@nestjs/common';

import { UpdateSystemRequest } from './dto/UpdateSystemRequest.dto';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  async createOrEditSystem(@Body() dto: UpdateSystemRequest) {
    await this.systemService.createOrEditSystem(dto);
  }

  @Get()
  async getSystem() {
    return await this.systemService.getSystem();
  }
}
