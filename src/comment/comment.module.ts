import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import {PrismaService} from "../core/prisma.service";
import {CommentController} from "./comment.controller";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [CommentService,PrismaService, JwtService],
  imports:[],
  controllers:[CommentController]
})
export class CommentModule {}
