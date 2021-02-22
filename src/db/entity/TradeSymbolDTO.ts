import {Entity, PrimaryColumn} from 'typeorm'

@Entity('trade_symbols')
export class TradeSymbolDTO {
    @PrimaryColumn()
    id: string;
}
