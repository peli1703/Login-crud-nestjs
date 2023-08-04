import { IsNumber, IsNotEmpty } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';

export class UpdateTodoStatusDTO {
    @IsNotEmpty()
    @IsNumber()
    status: number
}
