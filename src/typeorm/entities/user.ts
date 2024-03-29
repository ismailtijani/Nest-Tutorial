import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import * as bcrypt from 'bcrypt';

import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  //Exlcude paasword from response
  @Exclude()
  password: string;

  @Column()
  createdAt: Date;

  @Expose()
  //Providing Alias names from properies
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  //Hashing User plain text password before saving using Entity Listener
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  //Enabling Serialization (Removing sensitive datas)
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
