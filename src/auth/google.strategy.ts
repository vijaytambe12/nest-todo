import {Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {GoogleUserPayload} from "./googleuser.payload";
import {AuthService} from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google') {


    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:4000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log("Google Strategy");

        const { name, emails, photos } = profile;
        const user: GoogleUserPayload = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        };

        const newUser = await this.authService.checkAndAddUser(user);
        done(null, newUser);
    }
}
