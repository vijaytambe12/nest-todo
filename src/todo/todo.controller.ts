import {Body, Controller, Get, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {TodoListDto} from "./dto/todoList.dto";
import {toPromise} from "../shared/utils";
import {TodoDto} from "./dto/todo.dto";
import {TodoCreateDto} from "./dto/todo.create.dto";
import {AuthGuard} from '@nestjs/passport';
import {GoogleAuthGuard} from "../auth/google.authguard";
import {AuthorizedAuthGuard} from "../auth/authorized.authguard";

@Controller('api/todos')
export class TodoController {

    constructor(private readonly todoService: TodoService){

    }

    @Get()
    @UseGuards(new AuthorizedAuthGuard())
    async findAll(): Promise<TodoListDto> {
        const todos = await this.todoService.getAllTodo();
        return toPromise({ todos });
    }

    @Post("/")
    @UseGuards(new AuthorizedAuthGuard())
    async create(@Body() todoCreateDto: TodoCreateDto, @Req() req: any): Promise<TodoDto> {
        todoCreateDto.owner_id = req.user.id;
        return this.todoService.createTodo(todoCreateDto);
    }


    @Get(":id")
    @UseGuards(new AuthorizedAuthGuard())
    async findOne(@Param("id") id: string): Promise<TodoDto> {
        return this.todoService.getOneTodo(id);
    }

}
