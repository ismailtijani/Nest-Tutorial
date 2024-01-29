import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class AuthService {
  constructor(
    // Inject TypeORM repository into the service class to enable interaction with the database
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // Inject JTWService
    private readonly jwtService: JwtService
  ) {}

  // Create User profile
  async createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    //Save user data to database
    const savedUser = await this.userRepository.save(newUser);
    //JWT payload
    const payload = { sub: savedUser.id, username: savedUser.fullName };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  login(loginDetails: LoginDto) {
    // Validate User Credentials
    return this.validateUser(loginDetails);
  }

  // Hasing user plain text password before saving
  //   private async hashedPassword(password: string) {
  //     return bcrypt.hash(password, 8);
  //   }

  async validateUser({ email, password }: LoginDto) {
    console.log('Validating user....');
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
    //JWT payload
    const payload = { sub: user.id, username: user.fullName };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
