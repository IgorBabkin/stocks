import {IDataMapper} from "../IDataMapper";
import {ITradeSymbol} from "../../domain/ITradeSymbol";
import {TradeSymbolDTO} from "../../db/entity/TradeSymbolDTO";

export class TradeSymbolDataMapper implements IDataMapper<ITradeSymbol, TradeSymbolDTO> {
    constructor() {
    }

    toDTO(entity: ITradeSymbol): TradeSymbolDTO {
        return {
            id: entity.id,
        };
    }

    toEntity(dto: TradeSymbolDTO): ITradeSymbol {
        return {
            id: dto.id,
        };
    }
}
