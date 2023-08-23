import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardUser } from './schemas/user.schema';
import { Model } from 'mongoose';
const bcrypt = require("bcryptjs");
import { SignupDto } from 'src/DTO/signupDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(CardUser.name)
        private userModel: Model<CardUser>,

        private readonly jwtService: JwtService
    ){}

    async signUp(user: SignupDto): Promise<{userData: CardUser, token: string}> {
        const {name,  email, password } = user; 

        const hashedPassword = await bcrypt.hash(password, 12);

        const userData = await this.userModel.create({
            email,
            name,
            password: hashedPassword
        })

        const token = this.jwtService.sign({id: userData?._id, email: userData?.email})
       
        return {token, userData}
    }

    async signIn(user: SignupDto): Promise<{token: string , message: string}> {
        const {email, password } = user; 

        const oldUser = await this.userModel.findOne({ email: email });

        if (!oldUser){
            return {token: '',  message: "User doesn't exist" };
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect)
         {
            return {token: '',  message: "User doesn't exist" };
         }


        const token = this.jwtService.sign({id: oldUser?._id, email: oldUser?.email})
       
        return {token, message: 'Login Successfully'}
    }

}
