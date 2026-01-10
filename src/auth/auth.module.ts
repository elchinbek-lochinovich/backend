import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    JwtModule.register({
       secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
  signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenService],
  exports: [JwtModule, AuthService], // ✅ boshqa modullar (analytics) ham shu JwtService’ni oladi
})
export class AuthModule {}
