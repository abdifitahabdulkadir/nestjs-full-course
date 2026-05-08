import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  // imports: [CustomerModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
