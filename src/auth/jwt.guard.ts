import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader: string | undefined =
      req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing token');
    }

    // "Bearer <token>"
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
      });

      // controllerlarda ishlatish uchun
      req.user = payload; // { sub, role, iat, exp }
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
