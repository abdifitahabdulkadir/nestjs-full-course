import { Injectable, Scope } from '@nestjs/common';

/**
 * we can specify the behaviour of the service
 * by passing a scope to the @Injectable decorator.
 * and duration  for that service in conjunction with that scope.
 * by default , nest js makes it singleton  instnace object.
 * and you can change this behvoiour if you want by specifying
 * Scopy which is: you can either by defualt which is singleton,
 * new instance for each request. and or new private
 * instnace for each use controller
 * that injects int that means per consumer.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class CatsService {
  cats = [
    {
      name: 'Memow',
      age: 2,
    },
    {
      name: 'Memow',
      age: 2,
    },
    {
      name: 'Memow',
      age: 2,
    },
  ];
  getCats() {
    return this.cats;
  }
}
