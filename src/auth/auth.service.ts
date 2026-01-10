import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenService } from './refresh-token.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private refreshTokens: RefreshTokenService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });
    if (existing) throw new BadRequestException('Email already exists');

    const role = dto.role as Role;
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException(
        `Invalid role. Allowed: ${Object.values(Role).join(', ')}`,
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        role,
        studentProfile: undefined,
        teacherProfile: undefined,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  private async issueTokens(user: { id: number; role: Role }) {
    const jwtAccessSecret =
      process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    const jwtRefreshSecret =
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, role: user.role },
      { secret: jwtAccessSecret, expiresIn: '15m' },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      { secret: jwtRefreshSecret, expiresIn: '30d' },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokens.create({
      userId: user.id,
      refreshToken,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true, password: true, role: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokens({ id: user.id, role: user.role });
  }

  async refresh(refreshToken: string) {
    const jwtRefreshSecret =
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

    let payload: any;
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const stored = await this.refreshTokens.findValid(refreshToken);
    if (!stored) throw new UnauthorizedException('Invalid refresh token');

    await this.refreshTokens.revoke(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    return this.issueTokens({ id: user.id, role: user.role });
  }

  async logout(refreshToken: string) {
    await this.refreshTokens.revoke(refreshToken);
    return { success: true };
  }
}

