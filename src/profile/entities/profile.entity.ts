import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AddressDto } from '../dto/create-profile.dto';

@Entity({ name: 'userprofile' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'json' })
  address: AddressDto;
}
