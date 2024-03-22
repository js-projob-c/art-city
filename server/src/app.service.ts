import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): Record<string, any> {
    return { value: 'sdfsdf' };
  }
}
