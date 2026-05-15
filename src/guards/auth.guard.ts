import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
/**
 * guards determine weathe the request is allowed or not.
 * by either returning false or true.
 * true means proceed to the request.
 * false means reject the request.
 *
 * by defualt it nest returning false throws 403 forbidden error.
 * but for authorization purpose, we cna return unauthorized error.
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return false;
    const request = context.switchToHttp().getRequest<Request>();
    // console.log(context.getClass());
    // console.log(context.getHandler());
    // console.log(request.headers);
    // throw new UnauthorizedException(
    //   'You are not authorized to access this resource',
    // );

    // const result = this.jwtService.sign({
    //   sub: 1,
    //   username: 'Abdifitah Abdulkadir Mohamed',
    // },{});
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const verified = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request.body.user = verified;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
