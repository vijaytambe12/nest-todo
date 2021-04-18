import {Body, Controller, HttpException, HttpStatus, Post, UseGuards, Get, Req, Res} from '@nestjs/common';
import {LoginUserDto} from 'src/user/dto/loginuser.dto';
import {CreateUserDto} from 'src/user/dto/user.create.dto';
import {AuthService} from './auth.service';
import {LoginStatus} from './loginStatus';
import { GoogleAuthGuard } from 'src/auth/google.authguard';
import {RegistrationStatus} from "./registrationStatus";
import {AuthorizedAuthGuard} from "./authorized.authguard";
import {toPromise} from "../shared/utils";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {
        const result:
            RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Get('google/callback')
    @UseGuards(new GoogleAuthGuard())
    googleAuthRedirect(@Req() req, @Res() res) {
        return this.authService.googleLogin(req, res);
    }

    @Get('google')
    @UseGuards(new GoogleAuthGuard())
    googleAuth(@Req() req, @Res() res) {
        return this.authService.googleLogin(req, res);
    }

    @Get('me')
    @UseGuards(new AuthorizedAuthGuard())
    async getUser(@Req() req, @Res() res) {
        return res.send(req.user);
    }



    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }


}
