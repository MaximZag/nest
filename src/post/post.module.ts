import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import {PrismaService} from "../core/prisma.service";
import {PostController} from "./post.controller";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [PostService,PrismaService, JwtService],
  imports:[],
  controllers:[PostController]
})
export class PostModule {}
