import {SymbolId} from "./ISymbol";
import {Money} from "./Money";

type CandlestickType = 'bear' | 'bull'

export interface ICandlestick {
    type: CandlestickType;
    symbol: SymbolId;
    closePrice: Money;
    openPrice: Money;
}
