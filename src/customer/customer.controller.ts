import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private catsService: CatsService,
  ) {}

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get('cats')
  getCats() {
    return this.catsService.getCats();
  }
}
