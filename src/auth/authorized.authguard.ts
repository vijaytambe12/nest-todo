import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizedAuthGuard extends AuthGuard('authorized') {

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        console.log("In Auth Guard --> " , req.user);
        if (!req.user) throw new UnauthorizedException();
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
