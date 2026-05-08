import { Injectable } from '@nestjs/common';

// making class as injectable means it can be injected into other classes.
// or means it can be used as dependency in other classes.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
