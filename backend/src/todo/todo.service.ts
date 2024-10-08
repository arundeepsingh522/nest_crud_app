// src/todo/todo.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  // Create a new Todo
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const newTodo = new this.todoModel(createTodoDto);
      return await newTodo.save();
    } catch (error) {
        console.log('error in creating Todo',error.message);
        
      throw new BadRequestException('Error creating new todo');
    }
  }

  // Get all Todos
  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error fetching todos');
    }
  }

  // Get a single Todo by ID with error handling
  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.todoModel.findById(id).exec();
      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw new NotFoundException(`Error retrieving todo with ID: ${id}`);
    }
  }

  // Update a Todo by ID with error handling
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      console.log('updating todo...');
      
     
      
      const updatedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        { $set:  updateTodoDto },
        { new: true, runValidators: true } // Return the updated document and run validation
      );

 
        

      if (!updatedTodo) {
        throw new NotFoundException(`Todo with ID ${id} not found for update`);
      }
      return updatedTodo;
    } catch (error) {
        console.log('error in updating todo',);
        
      throw new BadRequestException(`Error updating Todo with ID: ${id}`);
    }
  }

  // Delete a Todo by ID with error handling
  async delete(id: string): Promise<Todo> {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
     
      
      if (!deletedTodo) {
        throw new NotFoundException(`Todo with ID ${id} not found for deletion`);
      }
      return deletedTodo;
    } catch (error) {
        console.log('error in deleting todo',error.message);
        
      throw new BadRequestException(`Error deleting Todo with ID: ${id}`);
    }
  }
}
