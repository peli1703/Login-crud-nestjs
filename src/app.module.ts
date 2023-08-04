import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, AuthModule, TodoModule, MulterModule.register({
    dest: './files',
  })],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
