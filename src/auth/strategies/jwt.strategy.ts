import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor( @InjectModel(User.name)
    private readonly userModel: Model<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'MATSUBARAMIKI',
        })
    }

   async validate(payload: JwtPayload): Promise<User>{

    const { email } = payload;

    const user = await this.userModel.findOne({ email });

    if ( !user ) 
            throw new UnauthorizedException('Token not valid')
       
    // TODO:     
    // if ( !user.isActive ) 
    //     throw new UnauthorizedException('User is inactive, talk with an admin');
        

        return user;

   }


}