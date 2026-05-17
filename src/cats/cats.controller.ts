import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import type { Request } from 'express';
import { Role } from '../../roles.enum.js';
import { Roles } from '../decorators/role.decorater.js';
import {
  type CreateCatDTO,
  createCatSchema,
  type UpdateCatDTO,
  updateCatSchema,
} from '../dtos/cats.dto.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { AuthorizationGuard } from '../guards/authorization.guard.js';
import { CustomInterceptor } from '../interceptors/interceptor.js';
import { ValidationPipe } from '../pipes/pipes.pipe.js';
import { CatsService } from './cats.service.js';

// it will call in order we have specified.
@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('cats')
@Roles(Role.Admin)
@UseInterceptors(CustomInterceptor)
export class CatsController {
  constructor(private cats: CatsService) {}

  @Get()
  // @UseGuards(AuthGuard) // only applies to this endpoint
  getCats(@Req() request: Request, @Headers('accept-language') acceptLnaguage) {
    console.log('From contrller level getCats: ', request.body.user);
    console.log('Accept Language: ', acceptLnaguage);
    console.log(request.headers['accept-language']);
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
