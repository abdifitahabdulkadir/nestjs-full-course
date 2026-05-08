import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { StudentService } from './student.service';

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
