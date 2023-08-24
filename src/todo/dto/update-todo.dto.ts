import { IsNotEmpty } from "class-validator";

export class UpdateTodoDto {
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
    @IsNotEmpty()
    filepath : string;
}
