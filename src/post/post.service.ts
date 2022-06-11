import { Injectable } from '@nestjs/common';
import {Post, Prisma} from '@prisma/client';
import {PrismaService} from "../core/prisma.service";

@Injectable()
export class PostService {
    constructor(private prismaService:PrismaService) {
    }

    getAllPosts():Promise<Post[]>{
        return this.prismaService.post.findMany();
    }

    getOnePost(postId:string):Promise<Post>{
        return this.prismaService.post.findUnique({
            where:{id:Number(postId)},
            include:{comments:true}
        })
    }

    createPost(data:Prisma.PostCreateInput):Promise<Post> {
        return this.prismaService.post.create({data})
    }

    updatePost(data:Prisma.PostUpdateInput, postId:string):Promise<Post>{
        return this.prismaService.post.update({
            where:{id:Number(postId)},
            data:{title:data.title, content:data.content}
        })
    }

    deletePost(postId:string){
        return this.prismaService.post.delete({
            where:{id:Number(postId)}
        })
    }
}
