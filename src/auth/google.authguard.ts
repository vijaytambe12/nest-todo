import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        const can = await super.canActivate(context);
        if (can) {
            super.logIn(request);
        }

        return true;
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        console.log("Request in GUARD");
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
