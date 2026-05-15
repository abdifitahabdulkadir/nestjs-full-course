import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  type CreateCatDTO,
  createCatSchema,
  type UpdateCatDTO,
  updateCatSchema,
} from 'src/dtos/cats.dto';
import { ValidationPipe } from 'src/pipes/pipes.pipe';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private cats: CatsService) {}

  @Get()
  getCats() {
    /**
     * this is handled exception and by default
     * nestjs will catch it and return a 500 error.
     *
     * we can use httpExcpetion but nestjs will catch it and return a 500 error or any other server error you provied with constructor
     *
     **/

    // throw new Error('This is a test error');

    // this is cought and shared wthis exact message
    // to client by nestjs exception layer

    // throw new HttpException(
    //   'this is simple error. dont be panic',
    //   HttpStatus.BAD_REQUEST,
    // );

    // we can also pass object format.
    // throw new HttpException(
    //   {
    //     serverTime: new Date().toISOString(),
    //     message: 'This is a test error',
    //     error: 'Bad Request',
    //   },
    //   HttpStatus.FORBIDDEN,
    //   {
    //     cause: new Error('This is a test error'),
    //     description: 'This is a test error',
    //   },
    // );
    return this.cats.getCats();
  }

  @Post()
  @UsePipes(new ValidationPipe(createCatSchema))
  createCat(@Body() cat: CreateCatDTO) {
    return this.cats.createCat(cat);
  }

  @Get(':id')
  getCatById(@Param('id', ParseIntPipe) id: number) {
    return this.cats.getCat(id);
  }

  @Patch(':id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe(updateCatSchema)) cat: UpdateCatDTO,
  ) {
    return this.cats.updateCat(id, cat);
  }
}
