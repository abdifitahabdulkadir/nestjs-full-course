import { Controller, Get } from '@nestjs/common';
import { CatsService } from '../cats/cats.service.js';
import { StudentService } from './student.service.js';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private catsService: CatsService,
  ) {}

  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  @Get('cats')
  getCats() {
    return this.catsService.getCats();
  }
}
