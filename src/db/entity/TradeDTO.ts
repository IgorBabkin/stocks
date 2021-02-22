import {Column, Entity, OneToOne, PrimaryColumn} from 'typeorm'
import {JoinColumn} from "typeorm/browser";
import {TradeSymbolDTO} from "./TradeSymbolDTO";
import {UserDTO} from "./UserDTO";
import {TradeType} from "../../domain/TradeType";

@Entity('trades')
export class TradeDTO {
    @PrimaryColumn()
    id: number;

    @Column()
    type: TradeType;

    @Column()
    shares: number;

    @Column()
    price: number;

    @OneToOne(type => TradeSymbolDTO)
    @JoinColumn()
    symbol: TradeSymbolDTO;

    @OneToOne(type => UserDTO)
    @JoinColumn()
    user: UserDTO;

    @Column({name: 'created_at'})
    createdAt: Date;
}
