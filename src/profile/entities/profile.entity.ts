import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userprofile' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: string;

  @Column({ type: 'int' })
  age: number;

  @Column()
  address: string;
}
