import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('/register')
  @ApiOperation({ description: 'Create user' })
  @ApiResponse({ type: UserDto })
  createOwner(@Body() userDetails: CreateUserDto) {
    return this.usersService.createUser(userDetails);
  }
}
