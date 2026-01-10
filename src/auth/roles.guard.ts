import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

type Role = string;

type JwtUser = {
  role?: Role;
};

type AuthRequest = Request & { user?: JwtUser };

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => (target: any, key?: any, descriptor?: any) => {
  Reflect.defineMetadata(ROLES_KEY, roles, descriptor?.value ?? target);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const clazz = context.getClass();

    const allowed =
      (this.reflector.get<Role[]>(ROLES_KEY, handler) ??
        this.reflector.get<Role[]>(ROLES_KEY, clazz)) || [];

    // agar roles qo'yilmagan bo'lsa — ruxsat (faqat JwtGuard tekshiradi)
    if (allowed.length === 0) return true;

    const req = context.switchToHttp().getRequest<AuthRequest>();
    const role = req.user?.role;

    if (!role) throw new ForbiddenException('No role');
    if (!allowed.includes(role)) throw new ForbiddenException('Forbidden');

    return true;
  }
}
