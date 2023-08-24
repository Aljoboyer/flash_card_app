import {Injectable, UnauthorizedException} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import {CardUser} from './schemas/user.schema'
import { Model } from 'mongoose'
import { ObjectId } from 'mongodb'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(CardUser.name)
        private userModel: Model<CardUser>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload){
        const {id} = payload;

        const user = await this.userModel.findById({_id: new ObjectId(id)})

        if(!user){
            throw new UnauthorizedException('Login First to access')
        }

        return user
    }
}