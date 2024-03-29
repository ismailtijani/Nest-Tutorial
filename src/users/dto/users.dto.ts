import { IsEmail, IsString, MinLength } from 'class-validator';

export class updateUserDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;
}
