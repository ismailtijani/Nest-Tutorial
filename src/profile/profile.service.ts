import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class ProfileService {
  constructor(
    // Inject TypeORM repository into the service class to enable interaction with the database
    @InjectRepository(Profile)
    private userProfileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUserProfile(id: number, profileDetails: CreateProfileDto) {
    //Check if User Exist
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, cannot create profile',
        HttpStatus.BAD_REQUEST
      );
    // Create userProfile
    const userProfile = this.userProfileRepository.create(profileDetails);
    //Save userProfile
    const savedProfile = await this.userProfileRepository.save(userProfile);
    //Update User Account
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  getUserProfile(id: number) {
    return this.userProfileRepository.findOneBy({ id });
  }

  updateUserProfile(id: number, profileDetails: UpdateProfileDto) {
    return this.userProfileRepository.update({ id }, { ...profileDetails });
  }
}
