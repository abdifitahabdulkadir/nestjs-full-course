import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CatsService } from '../cats/cats.service.js';
import { CustomerService } from './customer.service.js';

@Controller('customer')
export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private catsService: CatsService,
  ) {}

  /**
   * pipes operates on argumenta of the router handler
   * and trnasform or validate then based on the result
   * it gets to handler to furhter process. and can be
   * rejected or shor-circutied.
   */
  @Get()
  getCustomers(@Query('limit', ParseIntPipe) limit: number) {
    console.log('type of limit', typeof limit);

    return this.customerService.getCustomers();
  }

  @Get('cats')
  getCats() {
    return this.catsService.getCats();
  }
}
