import { Type } from 'class-transformer';
import {
  IsObject,
  IsDateString,
  IsString,
  ValidateNested,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

class NameDto {
  @IsString()
  @IsNotEmpty()
  first: string;

  @IsNotEmpty()
  @IsString()
  last: string;
}

export class CreateAuthDto {
  @IsObject()
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  image: string;
}
