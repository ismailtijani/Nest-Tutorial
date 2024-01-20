import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @MinLength(8)
  email: string;
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
