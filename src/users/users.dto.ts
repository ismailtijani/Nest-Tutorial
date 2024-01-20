import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createUserDto {
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

export class updateUserDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
}
