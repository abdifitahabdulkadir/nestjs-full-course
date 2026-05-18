import { Controller, Get } from '@nestjs/common';
import { CacheService } from '../cache/cache.service.js';
import { CatsService } from '../cats/cats.service.js';
import { StudentService } from './student.service.js';

/**
 * nestjs has interceptor that uses the default catche manager we have set, and
 * uses that configuration to cache the response.
 * it automatically checks ( only on get routes ) in the configured controller
 * or route(s) , stores their response in the cache. and for subsequent requests
 * it will return the cached response.
 * for time to live (TTL) , it uses the default ttl in the app module.
 * and we can override the ttl for a specific route by using the
 * @CacheTTL() decorator.
 */

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private catsService: CatsService,
    private readonly cache: CacheService,
  ) {}

  @Get()
  async getStudents() {
    // fetch the reddits cache
    const cachedStudents = await this.cache.get('students');
    if (cachedStudents) {
      return cachedStudents;
    }

    // store in the cache  and override the ttl for this route
    // await this.cacheManager.set('students', students, 10 * 1000);
    // return this.students;
    // const results = await this.cache.get('students');
    // if (results) {
    //   console.log('results from cache');
    //   return results;
    // }
    // console.log('results from database');
    const students = await this.studentService.getStudents();
    await this.cache.set('students', students);
    return students;
  }

  @Get('cats')
  getCats() {
    return this.catsService.getCats();
  }
}
