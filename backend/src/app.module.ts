import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [BookModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
