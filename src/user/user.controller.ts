import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    GetAll() {
        return this.userService.getAllUsers();
    }

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
}
