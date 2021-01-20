import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkersController } from './markers/markers.controller';

@Module({
  imports: [],
  controllers: [AppController, MarkersController],
  providers: [AppService],
})
export class AppModule {}
