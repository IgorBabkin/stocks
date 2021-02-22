import {Money} from "../../domain/Money";
import {SymbolId} from "../../domain/ITradeSymbol";

export interface CandlestickDTO {
    highestPrice: Money;
    lowestPrice: Money;
    symbol: SymbolId;
    closePrice: Money;
    openPrice: Money;
}
