import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  // Hasing user plain text password before saving
  //   private async hashedPassword(password: string) {
  //     return bcrypt.hash(password, 8);
  //   }

  lo;

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
