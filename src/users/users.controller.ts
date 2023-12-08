import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('id')
  getUsers(@Param('id') id: string) {
    return `All users${id}`;
  }
}
