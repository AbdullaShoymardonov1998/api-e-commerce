import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/core/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JWT_SALT } from 'src/consts/jwt';
import { json } from 'stream/consumers';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(userDetails: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: userDetails.email },
            { username: userDetails.username },
          ],
        },
      });

      if (existingUser) {
        throw new Error(
          'User already exists with the provided email or username',
        );
      }
      const user = await this.prisma.user.create({
        data: {
          email: userDetails.email,
          username: userDetails.username,
          password: await bcrypt.hash(userDetails.password, JWT_SALT),
        },
      });

      return {
        message: 'Successfully created',
        data: user,
      };
    } catch (error) {
      return {
        message: 'Error creating user',
        error: error.message,
      };
    }
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}
