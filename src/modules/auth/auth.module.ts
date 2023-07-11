import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    JwtService,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
