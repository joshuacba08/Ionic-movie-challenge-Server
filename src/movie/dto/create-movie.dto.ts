import { Type } from 'class-transformer';
import {
    IsObject,
    IsDateString,
    IsString,
    ValidateNested,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsNumber,
    IsArray,
  } from 'class-validator';


export class CreateMovieDto {

    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    poster_path: string;

    @IsNotEmpty()
    @IsString()
    overview: string;

    @IsNotEmpty()
    @IsString()
    release_date: string;

    @IsNotEmpty()
    @IsNumber()
    vote_average: number;

    
    @IsNumber()
    vote_count: number;
}
