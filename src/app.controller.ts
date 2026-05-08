import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * nestjs automaticlly serializes any object into json and primitives
   * resolve in normal waye.
   * but if dont want that form. you cna use library specific
   * response by adding a decorator like @Res() or @Response().
   *
   * you can access query params by using @Query() decorator.
   * and add name of object you wonna access one.
   * or by default will all params.
   */
  @Get()
  getHello(@Query('role') query): string {
    console.log(query);
    return this.appService.getHello();
  }
}
