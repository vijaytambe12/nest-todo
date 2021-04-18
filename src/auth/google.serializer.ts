import {
    Injectable,
} from '@nestjs/common';

import { PassportSerializer } from '@nestjs/passport';
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {User} from "../user/entity/user.entity";

@Injectable()
export class GoogleSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
        super();
    }

    serializeUser(user: User, done: CallableFunction) {
        console.log("Serializing" , user);
        done(null, user);
    }

    async deserializeUser(user: User, done: CallableFunction) {
        return await this.userService.findById(user.id)
            .then(user => done(null, user))
            .catch(error => done(error));
    }
}
