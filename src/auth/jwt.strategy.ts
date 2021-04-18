import {HttpStatus, Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {JwtPayload} from './jwt.payload';
import {UserDto} from "../user/dto/user.dto";
import {HttpException} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        console.log("JWT Strategy");

        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
