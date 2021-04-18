import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from "../user/user.module";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {GoogleStrategy} from "./google.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {GoogleSerializer} from "./google.serializer";

@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'google',
            property: 'user',
            session: true,
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, GoogleSerializer],
    exports: [
        PassportModule
    ]
})
export class AuthModule {}

