import {TradeType} from "./TradeType";
import {UserId} from "./IUser";
import {SymbolId} from "./ISymbol";
import {Money} from "./Money";

export type TradeId = string;
export interface ITrade {
    "id": TradeId,
    "type": TradeType,
    "user": {
        "id": UserId,
        "name": string
    },
    "symbol": SymbolId,
    "shares": number,
    "price": Money,
    "timestamp": Date,
}
