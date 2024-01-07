import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller(':id/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProfileDto: CreateProfileDto
  ) {
    return this.profileService.createUserProfile(+id, createProfileDto);
  }

  @Get()
  getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getUserProfile(id);
  }

  @Patch()
  updateUserProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.profileService.updateUserProfile(+id, updateProfileDto);
  }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
