import {Money} from "./Money";
import {SymbolId} from "./ITradeSymbol";
import {CandlestickType, ICandlestick} from "./ICandlestick";

export class Candlestick implements ICandlestick {
    constructor(
        public symbol: SymbolId,
        public openPrice: Money,
        public closePrice: Money,
        public highestPrice: Money,
        public lowestPrice: Money,
    ) {
    }

    get type(): CandlestickType {
        return this.closePrice > this.openPrice ? 'bull' : 'bear';
    }
}
