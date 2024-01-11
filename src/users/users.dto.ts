import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  password: string;
}

export class updateUserDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
