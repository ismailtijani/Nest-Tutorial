import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { updateUserDto } from './dto/users.dto';

@Controller('users')
@UseGuards(JwtGuard)
//Removing sensitive through serialization
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get()
  getUser(@Req() req: Request) {
    return this.userService.findUser(req.user.id);
  }

  @Patch()
  async updateUser(@Req() req: Request, @Body() updateDetails: updateUserDto) {
    await this.userService.updateUser(req.user.id, updateDetails);
  }

  @Delete()
  async deleteUser(@Req() req: Request) {
    await this.userService.deleteUser(req.user.id);
  }
}
