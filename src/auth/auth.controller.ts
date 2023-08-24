import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CardUser } from './schemas/user.schema';
import { SignupDto } from '../DTO/signupDto';
import { SigninDto } from '../DTO/signInDto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    async signUp(
        @Body()
        user: SignupDto
        ): Promise<{userData: CardUser, token: string}> {
       return this.authService.signUp(user)
    }

    @Post('signin')
    async signin(
        @Body()
        user: SigninDto
        ): Promise<{message: string, token: string}> {
       return this.authService.signIn(user)
    }

}
