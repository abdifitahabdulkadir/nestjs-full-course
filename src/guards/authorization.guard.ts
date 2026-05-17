import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { Role } from '../../roles.enum.js';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorater.js';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.body.user;
    const role = user.role as Role;
    /**
     * first not undefined value means the first (handler or class)
     * decorator has been added to the route or controller
     * and retuned any non-null value.
     */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      // this handler is decorator has been added to route level
      //   context.getHandler(),

      // this class is decorator has been added to controller level
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
