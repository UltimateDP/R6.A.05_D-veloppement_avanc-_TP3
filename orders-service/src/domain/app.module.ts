import { Module } from '@nestjs/common';
import { AppController } from './adapter/in/app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
