import { HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDTO } from './dto/update-todo-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { use } from 'passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Injectable()
export class TodoService {
  constructor(private readonly dbservice:PrismaService){}
  @UseGuards(JwtAuthGuard)
  async create(createTodoDto: CreateTodoDto, user_id : number, file) {
    const { name, category, title, description } = createTodoDto

  const todo = await this.dbservice.todo.create({
    data:{
      name:name,
      category :category,
      title:title,
      description:description,
      status: 0,
      filepath: file.filename,   
      user: {connect: {id : user_id} },
      
    }
  })
  if(todo){
    return{
      status:200,
      massage:'success create',
      data: todo
    }
  }else{
    return{
      status:400,
      massage:'failed create'
    }
  }
  }

  // findAll() — Menemukan semua item dalam database menggunakan metode find()
  async findAll() {
    const todo = await this.dbservice.todo.findMany()
    if(todo){
      return{
        status:200,
        massage:'success find data',
        data: todo
      }
    }else{
      return{
        status:400,
        massage:'failed find data'
      }
    }
  }

  // findOne() — Menemukan item yang memiliki id yang sama dengan parameter fungsi
  async findOne(id: number) {
    const todo = await this.dbservice.todo.findFirst({
      where : {id}
    })
    if(todo){
      return{
        status:200,
        massage:'success find one data',
        data: todo
      }
    }else{
      return{
        status:400,
        massage:'failed find one data'
      }
    }
  }
  
  async update(id: number, updateTodoDto) {
    const { name, category, title, description, filepath } = updateTodoDto
    return console.log(name)
    const todo = await this.dbservice.todo.update({
      where : {id},
      data: {
        name : updateTodoDto.name,
        category : updateTodoDto.category,
        title : updateTodoDto.title,
        description : updateTodoDto.description,
        filepath : updateTodoDto.filepath,
        updated_at : new Date()
      }
    })
    if(todo){
      return{
        status:200,
        massage:'success update data',
        data : {
          todo
        }
      }
    }else{
      return{
        status:400,
        massage:'failed update data'
      }
    }
  }

  async status(id: number, updateTodoStatusDto: UpdateTodoStatusDTO) {
    try{
    const todo = await this.dbservice.todo.update({
      where : {id},
      data: {
        status : updateTodoStatusDto.status,
        updated_at : new Date()  
      }
    })
    if(todo.status == 1){
      return{
        status:200,
        massage:'sedang dikerjakan',
        data : {
          todo
        }
      }
    }else if(todo.status == 2){
      return{
        status:200,
        massage:'selesai',
        data : {
          todo
        }
      }
    }
    else{
      return{
        status:400,
        massage:'failed update status'
      }
    }
  } catch (error){
    return {
      message: "Failed to update status",
      status: HttpStatus.BAD_REQUEST
    }
  }
  }


  async remove(id: number) {
    const todo = await this.dbservice.todo.delete({
      where:{id}
    })
    if(todo){
      return{
        status:200,
        massage:'success delete data',
       
      }
    }else{
      return{
        status:400,
        massage:'failed delete data'
      }
    }
  }
}
