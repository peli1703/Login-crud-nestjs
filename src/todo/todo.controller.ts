import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateTodoStatusDTO } from './dto/update-todo-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    const user_id = req.user.user_id;
    return this.todoService.create(createTodoDto, user_id);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination:'./image/',
  //     filename: (req, file, callback)=>{
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       const ext = extname(file.originalname)
  //       const filename = `${file.originalname}-${uniqueSuffix}${ext}`
  //       callback(null, filename)
  //     }
  //   })
  // }))

  @Get('/')
  findAll() {
    return this.todoService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @UsePipes(ValidationPipe)
  @Patch('/status/:id')
  status(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoStatusDTO) {
    return this.todoService.status(+id, updateTodoDto );
  } 

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
