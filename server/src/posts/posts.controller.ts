import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreatePostsDto from './create-post.dto';
import { CreateReplyDto } from './create-reply-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Get()
    async getPosts() {
        return await this.postService.getPosts();
    }

    @Get('get')
    async getPost(@Query('id') _id: string) {
        return await this.postService.getPost(_id);
    }

    @Post('/create')
    createPost(@Body() createPostDto: CreatePostsDto) {
        return this.postService.createPost(createPostDto);
    }

    @Post('/reply')
    async replyToPost(@Body() { target, message }: CreateReplyDto) {
        return this.postService.reply(target, message);
    }
}
