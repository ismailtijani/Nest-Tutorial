import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    // Inject TypeORM repository into the service class to enable interaction with the database
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  // Create User profile
  createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  // Hasing user plain text password before saving
  //   private async hashedPassword(password: string) {
  //     return bcrypt.hash(password, 8);
  //   }

  async validateUser(email: string, password: string) {
    //Check if User Exist
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new HttpException(
        'No Account with this credentials, kindly signup',
        HttpStatus.BAD_REQUEST
      );
    //Compare user passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.BAD_REQUEST
      );
    return user;
  }
}
