import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MovieService {

  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const training = await this.movieModel.create(createMovieDto);
      return training;
    }catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Can't create Training - Check server logs",
        error,
      );
    }
  }

  async registerVote(id:string, updateMovieDto:UpdateMovieDto){
    try {
      const movie = await this.movieModel.findByIdAndUpdate(id, {...updateMovieDto}, { new: true })
      return {
        ok:true,
        data:movie
      }
    } catch (error) {
      throw new BadRequestException(`The id no exist in db`);
    }
  }

  async findAll() {
    try {
      const movies = await this.movieModel.find();
      return {
        ok:true,
        data:movies
      }
    
    } catch (error) {
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
