import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashToken } from 'src/common/utils/token-hash';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  async create(params: {
    userId: number;
    refreshToken: string;
    expiresAt: Date;
    userAgent?: string;
    ip?: string;
  }) {
    return this.prisma.refreshToken.create({
      data: {
        userId: params.userId,
        tokenHash: hashToken(params.refreshToken),
        expiresAt: params.expiresAt,
        userAgent: params.userAgent,
        ip: params.ip,
      },
    });
  }

  async findValid(refreshToken: string) {
    return this.prisma.refreshToken.findFirst({
      where: {
        tokenHash: hashToken(refreshToken),
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async revoke(refreshToken: string, replacedByHash?: string) {
    return this.prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(refreshToken) },
      data: {
        revokedAt: new Date(),
        replacedBy: replacedByHash,
      },
    });
  }
}
