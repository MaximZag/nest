import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,){
    }


    async login(authDto: AuthUserDto) {
        const user = await this.validateUser(authDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const findUser = await this.userService.getUserByEmail(userDto.email);
        if (findUser) {
            throw new HttpException('This user already exists', HttpStatus.CONFLICT);
        }
        const hashPass = await bcrypt.hash(userDto.password, 6);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPass,
        });
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, name: user.name };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(user: AuthUserDto) {
        const userDB = await this.userService.getUserByEmail(user.email);
        const passEqual = await bcrypt.compare(user.password, userDB.password);
        if (userDB && passEqual) {
            return userDB;
        }
        throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
}
