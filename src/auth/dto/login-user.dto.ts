import { Type } from 'class-transformer';
import {
  IsObject,
  IsDateString,
  IsString,
  ValidateNested,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail
} from 'class-validator';


export class LoginUserDto {
  
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
  
  }