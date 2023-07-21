import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create/:user_id')
  create(@Body() createTodoDto: CreateTodoDto,@Param('user_id') user_id:string) {
    return this.todoService.create(createTodoDto, +user_id);
  }

  @Get('/getdata')
  findAll() {
    return this.todoService.findAll();
  }

  @Get('/getdata/:id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
