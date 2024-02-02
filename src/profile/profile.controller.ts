import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProfileDto: CreateProfileDto
  ) {
    return this.profileService.createUserProfile(id, createProfileDto);
  }

  @Get()
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    const userProfile = await this.profileService.getUserProfile(id);
    if (!userProfile)
      throw new HttpException(
        'Profile not found, kindly create one',
        HttpStatus.BAD_REQUEST
      );
    return userProfile;
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateUserProfile(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.profileService.updateUserProfile(+id, updateProfileDto);
  }
}
