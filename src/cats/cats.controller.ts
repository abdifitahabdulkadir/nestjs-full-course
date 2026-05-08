import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private cats: CatsService) {}

  @Get()
  getCats() {
    return this.cats.getCats();
  }
}
