import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserController} from "./user.controller";
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [UserService, PrismaService,JwtService],
  imports:[],
  controllers:[UserController]
})
export class UserModule {}
