import { Injectable } from '@nestjs/common';
import { UserTest } from '@art-city/common/enums';

@Injectable()
export class AppService {
  health(): string {
    return UserTest.TEST;
  }
}
