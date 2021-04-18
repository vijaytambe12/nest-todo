import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()  username: string;
    password?: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}
