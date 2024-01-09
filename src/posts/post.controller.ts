import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';

@Controller(':id/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postService.createPost(id, createPostDto);
  }
}
