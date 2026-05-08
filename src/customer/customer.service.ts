import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  ];

  getCustomers() {
    return this.customers;
  }
}
