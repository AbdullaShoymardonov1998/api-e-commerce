import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'User sign in. Response includes JWT token' })
  @ApiResponse({
    type: LoginUserResponseDto,
  })
  userLogin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.userLogin(loginUserDto);
  }
}
