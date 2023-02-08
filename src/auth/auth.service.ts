import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {
    try {

      const { password, ...userData } = createAuthDto;


      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });
      delete user.password;
      return {user, token: this.getJwtToken({email: user.email})};
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `the email allredy exist in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        "Can't create User - Check server logs",
      );
    }
  }

  async login(loginUserDto: LoginUserDto){
    // try {
      const { email, password } = loginUserDto;
      const user = await this.userModel.findOne({email});
      console.log(user);
      if( !user ){
        throw new UnauthorizedException("Credentials are not valid (email)");   
      }
      if( !bcrypt.compareSync( password, user.password )){
        throw new UnauthorizedException("Credentials are not valid (password)"); 
      }
      
      return user
    // } catch (error) {
    //   this.handleDBErrors(error);
    // }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  private getJwtToken( payload:JwtPayload ){
    const token = this.jwtService.sign( payload );
    return token;
    
  }

  // private handleDBErrors( error: any ): never {


  //   if ( error.code === '23505' ) 
  //     throw new BadRequestException( error.detail );

  //   console.log(error)

  //   throw new InternalServerErrorException('Please check server logs');

  // }
}
