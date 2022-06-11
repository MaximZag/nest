import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    GetAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Get one user' })
    @ApiOkResponse({
        status: 200,
        schema: {
            example: {
                id: 1,
                email: 'example@mail.com',
                name: 'Katya',
                city: 'New York',
                status: true,
                age: 30,
                password: 'qwerty12345',
            },
        },
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneUserById(@Param('id') id: string) {
        return this.userService.getOneById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Put('/:id')
    updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
        return this.userService.updateUser(userData, id);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
    return this.userService.deleteUser(id)
    }
}
