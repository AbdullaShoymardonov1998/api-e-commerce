import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty({ description: 'User name', example: 'John' })
  username: string;

  @ApiProperty({ description: 'User email', example: 'john@doe.com' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty({ description: 'User password', example: 'password' })
  password: string;
}
