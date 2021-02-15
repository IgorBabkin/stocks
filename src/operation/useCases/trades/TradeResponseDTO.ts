import {TradeId} from "../../../domain/ITrade";
import {TradeType} from "../../../domain/TradeType";
import {UserId} from "../../../domain/IUser";
import {SymbolName} from "../../../domain/ISymbol";
import {Money} from "../../../domain/Money";

export interface TradeResponseDTO {
    "id": TradeId,
    "type": TradeType,
    "user": {
        "id": UserId,
        "name": string
    },
    "symbol": SymbolName,
    "shares": number,
    "price": Money,
    "timestamp": Date,
}
