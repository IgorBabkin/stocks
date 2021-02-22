import {SymbolId} from "./ITradeSymbol";
import {Money} from "./Money";

export type CandlestickType = 'bear' | 'bull'

export interface ICandlestick {
    highestPrice: Money;
    lowestPrice: Money;
    type: CandlestickType;
    symbol: SymbolId;
    closePrice: Money;
    openPrice: Money;
}
