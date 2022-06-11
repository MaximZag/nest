import {Injectable} from '@nestjs/common';
import {Prisma, User} from '@prisma/client';
import {PrismaService} from '../core/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    getUserByEmail(userEmail:string):Promise<User>{
        return this.prismaService.user.findUnique({
            where:{email:userEmail}
        })
    }

    getOneById(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {id: Number(userId)},
            include: {posts: true, Comment: true}
        });
    }

    createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({data});
    }

    updateUser(userData: Prisma.UserUpdateInput, userId: string): Promise<User> {
        return this.prismaService.user.update({
            where: {id: Number(userId)},
            data: {name: userData.name, city: userData.city, age: userData.age},
        });
    }

    saveToken(token:string,userId:string):Promise<User>{
        return this.prismaService.user.update({
            where:{id:Number(userId)},
            data:{}
        })
    }

    deleteUser(userId: string) {
        return this.prismaService.user.delete({where: {id: Number(userId)}})
    }
}