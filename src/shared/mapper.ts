import {Todo} from "../todo/entity/todo.entity";
import {TodoDto} from "../todo/dto/todo.dto";
import {User} from "../user/entity/user.entity";
import {UserDto} from "../user/dto/user.dto";

export const toTodoDto = (data: Todo): TodoDto => {
    const { id, name, description } = data;

    let todoDto: TodoDto = { id, name, description, };
    return todoDto;

};


export const toUserDto = (data: User): UserDto => {
    const { id, username, email , password} = data;
    let userDto: UserDto = { id, username, email, password};
    return userDto;
};
