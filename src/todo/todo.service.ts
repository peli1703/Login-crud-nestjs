import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { use } from 'passport';

@Injectable()
export class TodoService {
  constructor(private readonly dbservice:PrismaService){}
  async create(createTodoDto: CreateTodoDto, user_id:number) {
  const todo = await this.dbservice.todo.create({
    data:{
      name: createTodoDto.name,
      action: createTodoDto.action,
      user: {connect: {id:user_id} },
    }
  })
  if(todo){
    return{
      status:201,
      massage:'success create',
      data: todo
    }
  }else{
    return{
      status:401,
      massage:'failed create'
    }
  }
  }


  async findAll() {
    const todo = await this.dbservice.todo.findMany()
    if(todo){
      return{
        status:201,
        massage:'success find data',
        data: todo
      }
    }else{
      return{
        status:401,
        massage:'failed find data'
      }
    }
  }

  async findOne(id: number) {
    const todo = await this.dbservice.todo.findFirst({
      where : {id}
    })
    if(todo){
      return{
        status:201,
        massage:'success find one data',
        data: todo
      }
    }else{
      return{
        status:401,
        massage:'failed find one data'
      }
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.dbservice.todo.update({
      where : {id},
      data: {
        name : updateTodoDto.name,
        action : updateTodoDto.action,
      }
    })
    if(todo){
      return{
        status:201,
        massage:'success update data',
      }
    }else{
      return{
        status:401,
        massage:'failed update data'
      }
    }
  }

  async remove(id: number) {
    const todo = await this.dbservice.todo.delete({
      where:{id}
    })
    if(todo){
      return{
        status:201,
        massage:'success delete data',
       
      }
    }else{
      return{
        status:401,
        massage:'failed delete data'
      }
    }
  }
}
