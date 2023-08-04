import { IsEmail, Validate } from 'class-validator';
import { DomainValidator } from '../domain-validator';
export class LoginDto {

  @IsEmail()
  @Validate(DomainValidator)
  email: string;
  password: string;

}