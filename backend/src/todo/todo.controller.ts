// src/todo/todo.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() UpdateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, UpdateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
