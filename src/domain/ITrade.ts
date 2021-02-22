import {TradeType} from "./TradeType";
import {IUser} from "./IUser";
import {ITradeSymbol} from "./ITradeSymbol";
import {Money} from "./Money";

export type TradeId = string;

export interface ITrade {
    id: TradeId,
    type: TradeType,
    user: IUser,
    symbol: ITradeSymbol,
    shares: number,
    price: Money,
    timestamp: Date,
}
