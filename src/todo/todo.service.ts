import {Injectable} from '@nestjs/common';
import {Todo} from "./entity/todo.entity";
import {TodoDto} from "./dto/todo.dto";
import {TodoCreateDto} from "./dto/todo.create.dto";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";


@Injectable()
export class TodoService {


    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async getOneTodo(id: string): Promise<TodoDto> {
        return this.todoRepository.findOne(id);
    }

    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
        const { name, description , owner_id} = todoDto;
        const todo: any = {
            name,
            description,
            owner_id
        };
       return this.todoRepository.save(todo);
    }

    async getAllTodo(): Promise<TodoDto[]> {
        return this.todoRepository.find();
    }


}
