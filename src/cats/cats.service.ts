import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateCatDTO, UpdateCatDTO } from 'src/dtos/cats.dto';

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
      breed: 'Siamese',
      id: 1,
    },
    {
      name: 'Memow',
      age: 2,
      breed: 'Siamese',
      id: 2,
    },
    {
      name: 'Memow',
      age: 2,
      breed: 'Siamese',
      id: 3,
    },
  ];

  createCat(cat: CreateCatDTO) {
    this.cats.push({
      ...cat,
      id: this.cats.length + 1,
    });
    return this.cats;
  }

  getCats() {
    return this.cats;
  }

  getCat(id: number) {
    return this.cats.find((cat) => cat.id === id);
  }

  updateCat(id: number, cat: UpdateCatDTO) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException('Cat not found');
    }
    this.cats[index] = { ...this.cats[index], ...cat };
    return this.cats[index];
  }
}
