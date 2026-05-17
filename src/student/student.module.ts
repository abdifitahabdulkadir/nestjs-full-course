import { Module } from '@nestjs/common';
import { StudentController } from './student.controller.js';
import { StudentService } from './student.service.js';

@Module({
  // imports: [CustomerModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
