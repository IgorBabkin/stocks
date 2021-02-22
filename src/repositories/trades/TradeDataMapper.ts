import {IDataMapper} from "../IDataMapper";
import {ITrade} from "../../domain/ITrade";
import {TradeDTO} from "../../db/entity/TradeDTO";
import {IUser} from "../../domain/IUser";
import {UserDTO} from "../../db/entity/UserDTO";
import {ITradeSymbol} from "../../domain/ITradeSymbol";
import {TradeSymbolDTO} from "../../db/entity/TradeSymbolDTO";

export class TradeDataMapper implements IDataMapper<ITrade, TradeDTO> {
    constructor(private userDataMapper: IDataMapper<IUser, UserDTO>, private tradeSymbolDataMapper: IDataMapper<ITradeSymbol, TradeSymbolDTO>) {
    }

    toDTO(entity: ITrade): TradeDTO {
        return {
            id: parseInt(entity.id, 10),
            price: entity.price,
            shares: entity.shares,
            symbol: this.tradeSymbolDataMapper.toDTO(entity.symbol),
            createdAt: entity.timestamp,
            type: entity.type,
            user: this.userDataMapper.toDTO(entity.user),
        };
    }

    toEntity(dto: TradeDTO): ITrade {
        return {
            id: dto.id.toString(10),
            price: dto.price,
            shares: dto.shares,
            symbol: this.tradeSymbolDataMapper.toEntity(dto.symbol),
            timestamp: dto.createdAt,
            type: dto.type,
            user: this.userDataMapper.toEntity(dto.user),
        };
    }
}
