import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private postService:PostService) {
    }

    @ApiOperation({summary:'Get all Posts'})
    @HttpCode(HttpStatus.OK)
    @Get()
    GetAll() {
        return this.postService.getAllPosts()
    }

    @ApiOperation({summary:'Get one Post'})
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOnePost(@Param('id') id:string){
        return this.postService.getOnePost(id)
    }

    @ApiOperation({summary:'Create Post'})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createPost(@Body() postDto:CreatePostDto){
        return this.postService.createPost(postDto)
    }

    @ApiOperation({summary:'Update Post'})
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updatePost(@Body() postData:CreatePostDto, @Param('id') id:string){
        return this.postService.updatePost(postData,id)
    }

    @ApiOperation({summary:'Delete Post'})
    @HttpCode(HttpStatus.GONE)
    @Delete('/:id')
    deletePost(@Param('id') id:string){
        return this.postService.deletePost(id)
    }
}
