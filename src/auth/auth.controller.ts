import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthUserDto} from './dto/auth-user.dto';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login'})
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        status: 201,
        schema: {
            example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzRAZ21haWwuY29tIiwiaWQiOjMsIm5hbWUiOiJFbW1hIiwiaWF0IjoxNjU0OTY3NjEzLCJleHAiOjE2NTUwNTQwMTN9.2S3zHFCKe-whXXOh1wfItKTwWHR7XgD0oz6ABOpGV6w"
            },
        },
    })
    @Post('/login')
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto);
    }

    @ApiOperation({summary: 'Registration'})
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        status: 201,
        schema: {
            example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzRAZ21haWwuY29tIiwiaWQiOjMsIm5hbWUiOiJFbW1hIiwiaWF0IjoxNjU0OTY3NjEzLCJleHAiOjE2NTUwNTQwMTN9.2S3zHFCKe-whXXOh1wfItKTwWHR7XgD0oz6ABOpGV6w"
            },
        },
    })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
