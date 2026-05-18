import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
    },
  ];

  async getStudents() {
    return await this.getStudentsFromDatabase();
  }

  async getStudentsFromDatabase() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.students;
  }
}
