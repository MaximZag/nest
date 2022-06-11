import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { CommentService } from './comment.service';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {AuthGuard} from "../auth/guard/guard";

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService) {
    }

    @ApiOperation({summary:'Get all Comments'})
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AuthGuard)
    GetAll() {
        return this.commentService.getAllComments()
    }

    @ApiOperation({summary:'Get one Comment'})
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    @UseGuards(AuthGuard)
    getOneComment(@Param('id') id:string){
        return this.commentService.getOneComment(id)
    }

    @ApiOperation({summary:'Create Comment'})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AuthGuard)
    createComment(@Body() commentDto:CreateCommentDto){
        return this.commentService.createComment(commentDto)
    }

    @ApiOperation({summary:'Update Comment'})
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    @UseGuards(AuthGuard)
    updateComment(@Body() commentData:UpdateCommentDto, @Param('id') id:string){
        return this.commentService.updateComment(commentData,id)
    }

    @ApiOperation({summary:'Delete Comment'})
    @HttpCode(HttpStatus.GONE)
    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteComment(@Param('id') id:string){
        return this.commentService.deleteComment(id)
    }
}
