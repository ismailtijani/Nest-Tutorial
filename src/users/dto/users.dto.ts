import { IsEmail } from 'class-validator';

export class updateUserDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
}
