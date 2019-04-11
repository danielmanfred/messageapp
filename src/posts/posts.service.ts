import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAll() {
    return await this.postRepository.find()
  }

  async createPost(newPost: CreatePostDto) {
    const post = new Post()
    post.post = newPost.post
    post.nick = newPost.nick

    return await this.postRepository.save(post)
  }

  async updatePost(idPost: number, postUpdate: CreatePostDto) {
    const post = await this.postRepository.findOne(idPost)
    post.nick = postUpdate.nick
    post.post = postUpdate.post 

    return await this.postRepository.save(post)
  }

  async deletePost(idPost: number) {
    return await this.postRepository.delete(idPost)
  }
}
