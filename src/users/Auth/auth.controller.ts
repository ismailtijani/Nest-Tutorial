import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users.dto';

@Controller('auth')
export class Auth {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.validateUser(email, password);
  }
}
