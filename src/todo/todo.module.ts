import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Todo} from "./entity/todo.entity";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";
import {User} from "../user/entity/user.entity";


@Module({
  imports: [UserModule,
    AuthModule ,
    TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService]
})

export class TodoModule {

}
