import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')
export class UserDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 10})
    name: string;
}
