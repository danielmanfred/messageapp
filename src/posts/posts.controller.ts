import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsSevice: PostsService) {

  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Res() response: any) {
    this.postsSevice.createPost(createPostDto)
        .then(post => response.status(HttpStatus.CREATED).json(post))
        .catch(err => response.status(HttpStatus.FORBIDDEN).json({
          message: 'Error in post creation',
          error: err
        }))
  }

  @Get()
  getAll(@Res() response: any) {
    this.postsSevice.getAll()
      .then(list => response.status(HttpStatus.OK).json(list))
      .catch(err => response.status(HttpStatus.FORBIDDEN).json({
        message: 'Error to get list posts',
        error: err
      }))
  }

  @Put(':id')
  update(@Body() updatePostDto: CreatePostDto, @Res() response: any, @Param('id') idPost: any) {
    this.postsSevice.updatePost(idPost, updatePostDto)
      .then(post => response.status(HttpStatus.OK).json(post))
      .catch(err => response.status(HttpStatus.FORBIDDEN).json({
        message: 'Error to edit the post',
        error: err
      }))
  }

  @Delete(':id') 
  delete(@Res() response: any, @Param('id') idPost: any) {
    this.postsSevice.deletePost(idPost)
      .then(res => response.status(HttpStatus.OK).json(res))
      .catch(err => response.status(HttpStatus.FORBIDDEN).json({
        message: 'Error to delete the post',
        error: err
      }))
  }
}
