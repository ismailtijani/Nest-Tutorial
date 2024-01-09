import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/post.dto';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private userPostRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createPost(id: number, postDetails: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, cannot make a post',
        HttpStatus.BAD_REQUEST
      );
    const newPost = this.userPostRepository.create({ ...postDetails, user });
    return this.userPostRepository.save(newPost);
  }
}
