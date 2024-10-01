import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateTodoDto {


    @IsNotEmpty({message:'Title is Required '})
    readonly title: string;

    @IsNotEmpty({message:'Description is required'})
    readonly description: string;

    @IsOptional() //This field is optional
    readonly completed?: boolean;
  }
  