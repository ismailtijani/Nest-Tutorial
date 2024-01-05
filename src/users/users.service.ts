import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { createUserDto, updateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    // Inject TypeORM repository into the service class to enable interaction with the database
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  //   Create User profile
  createUser(userDetails: createUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  //GET all users
  getUsers() {
    return this.userRepository.find();
  }

  // GET a single User
  findUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  // Update User Profile
  updateUser(id: number, updateDetails: updateUserDto) {
    return this.userRepository.update({ id }, { ...updateDetails });
  }

  // Delete User Account
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
