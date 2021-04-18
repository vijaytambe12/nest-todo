import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {User} from "./entity/user.entity";
import {UserDto} from "./dto/user.dto";
import {CreateUserDto} from "./dto/user.create.dto";
import {toUserDto} from "../shared/mapper";
import {toPromise} from "../shared/utils";
import {LoginUserDto} from "./dto/loginuser.dto";
import {HttpException} from '@nestjs/common';
import {HttpStatus} from '@nestjs/common';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getOne(id: string): Promise<UserDto> {
        const user: User = await this.userRepository.findOne(id);
        return toPromise(toUserDto(user));
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = createUserDto;

        // check if the user exists in the db
        const userInDb = await this.userRepository.findOne({
            where: { username, email }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const user: User = await this.userRepository.create({ username, password, email, });
        await this.userRepository.save(user);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords

        const areEqual =  await bcrypt.compare(password, user.password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({username}: any): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }


    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { email: email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }
}
