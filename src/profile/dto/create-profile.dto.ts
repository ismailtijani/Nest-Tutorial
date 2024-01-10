import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsNumber()
  line?: number;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNumber()
  age: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
