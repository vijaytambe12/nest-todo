import {AfterLoad, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import * as bcrypt from "bcrypt";
import {Todo} from "../../todo/entity/todo.entity";
import * as random from "randomstring";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: true})
    first_name?: string;

    @Column({nullable: true})
    last_name?: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Todo, todo => todo.owner_id)
    todo: Todo[];

    @BeforeInsert()
    async hashPassword() {
        if (!this.password) {
            this.password = random.generate({
                length: 12,
                charset: 'alphabetic'
            });
        }
        this.password = await bcrypt.hash(this.password, 10);
    }

}
