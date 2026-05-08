import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CustomerModule } from './customer/customer.module';
import { StudentModule } from './student/student.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [CatsModule, CustomerModule, StudentModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
