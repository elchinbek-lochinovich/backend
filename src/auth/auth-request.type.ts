import { Request } from 'express';
import { Role } from '@prisma/client';

export type JwtUser = {
  sub: number;       // JWT standart
  id?: number;       // eski controllerlar uchun (sub bilan bir xil bo‘ladi)
  role: Role;        // Prisma enum: RECTOR | TEACHER | STUDENT
};

export type AuthRequest = Request & { user?: JwtUser };
