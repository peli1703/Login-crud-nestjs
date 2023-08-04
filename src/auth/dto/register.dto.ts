import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { DomainValidator } from '../domain-validator';

export class RegisterDto  {

  @IsString()
  @IsNotEmpty()
  name: string;

  //untuk memeriksa apakah email valid atau tidak
  @IsEmail()
  @IsNotEmpty()
  // memeriksa email yg diizinkan
  email: string;

  @IsNotEmpty()
  password: string;

}