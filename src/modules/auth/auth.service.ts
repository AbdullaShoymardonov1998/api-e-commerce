import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  id: string;
  username?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!(user && isPasswordSame)) return null;

    return user;
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, username };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { message: 'Succes', data: accessToken };
  }
}
