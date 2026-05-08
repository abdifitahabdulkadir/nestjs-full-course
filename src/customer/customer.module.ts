import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  // we disabled becase we made gloabl the cats Service.
  // imports: [CatsModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  // exports: [CatsModule],
})
export class CustomerModule {}
