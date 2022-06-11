import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {AuthGuard} from "../auth/guard/guard";

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private postService:PostService) {
    }

    @ApiOperation({summary:'Get all Posts'})
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AuthGuard)
    GetAll() {
        return this.postService.getAllPosts()
    }

    @ApiOperation({summary:'Get one Post'})
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    @UseGuards(AuthGuard)
    getOnePost(@Param('id') id:string){
        return this.postService.getOnePost(id)
    }

    @ApiOperation({summary:'Create Post'})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AuthGuard)
    createPost(@Body() postDto:CreatePostDto){
        return this.postService.createPost(postDto)
    }

    @ApiOperation({summary:'Update Post'})
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    @UseGuards(AuthGuard)
    updatePost(@Body() postData:UpdatePostDto, @Param('id') id:string){
        return this.postService.updatePost(postData,id)
    }

    @ApiOperation({summary:'Delete Post'})
    @HttpCode(HttpStatus.GONE)
    @Delete('/:id')
    @UseGuards(AuthGuard)
    deletePost(@Param('id') id:string){
        return this.postService.deletePost(id)
    }
}
