import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import {PrismaService} from "../core/prisma.service";
import {PostController} from "./post.controller";

@Module({
  providers: [PostService,PrismaService],
  imports:[],
  controllers:[PostController]
})
export class PostModule {}
