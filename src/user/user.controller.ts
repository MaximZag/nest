import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from 'src/auth/guard/guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({summary:'Get all Users'})
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AuthGuard)
    GetAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Get one user'})
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
    @UseGuards(AuthGuard)
    getOneUserById(@Param('id') id: string) {
        return this.userService.getOneById(id);
    }

    @ApiOperation({summary:'Create User'})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AuthGuard)
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary:'Update User'})
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    @UseGuards(AuthGuard)
    updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
        return this.userService.updateUser(userData, id);
    }

    @ApiOperation({summary:'Delete User'})
    @HttpCode(HttpStatus.GONE)
    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
