import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createUserDto, updateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: createUserDto) {
    this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: updateUserDto
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
