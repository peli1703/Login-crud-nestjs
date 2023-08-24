import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    category : string;
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    description : string; 
    @IsNotEmpty()
    status : number;
}
