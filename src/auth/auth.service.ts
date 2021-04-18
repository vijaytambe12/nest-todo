import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {LoginUserDto} from 'src/user/dto/loginuser.dto';
import {CreateUserDto} from 'src/user/dto/user.create.dto';
import {UserService} from "../user/user.service";
import {JwtPayload} from './jwt.payload';
import {RegistrationStatus} from './registrationStatus';
import {UserDto} from "../user/dto/user.dto";
import {LoginStatus} from './loginStatus';
import {toPromise} from "../shared/utils";
import {GoogleUserPayload} from "./googleuser.payload";
import {User} from "../user/entity/user.entity";

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UserService ) {


    }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {

        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);
        console.log(user);

        /*// generate and sign token
        const token = this._createToken(user);

        return {
            username: user.username, ...token
        }*/;

        return {
            username: user.username,
            token: "test"
        }
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {

        const user = await this.usersService.findByPayload(payload);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async checkAndAddUser (payload: GoogleUserPayload): Promise<UserDto> {
        let user;
        try {
            user = await this.usersService.findByEmail(payload.email);
        } catch (e) {
            const newUser: CreateUserDto = {
                username: payload.email,
                email: payload.email,
            };
            user = await this.usersService.create(newUser);
            return user;
        }
        return user;
    }

   /* private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user, {secret: process.env.SECRETKEY,
            expiresIn: process.env.EXPIRESIN});
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        };
    }
*/
    async googleLogin(req, res): Promise<string> {
        res.redirect("http://localhost:3000");
        return toPromise("Success");
    }

    async getLoggedinUser(req, res): Promise<User> {
        return toPromise(req.user);
    }
}
