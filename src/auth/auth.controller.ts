import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup() {
    return this.authService.createUser();
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.validateUser(email, password);
  }
}
