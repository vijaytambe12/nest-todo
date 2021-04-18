import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entity/user.entity";

@Entity('todo')
export class Todo {

    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description?: string;

    @Column()
    owner_id: string;



}
