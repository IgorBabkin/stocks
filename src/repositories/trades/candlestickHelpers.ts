import {TradeDTO} from "../../db/entity/TradeDTO";
import {SymbolId} from "../../domain/ITradeSymbol";
import {CandlestickDTO} from "./CandlestickDTO";

function toDouble(value: number): string {
    return ("0" + value).substr(-2);
}

function getDate(date: Date): string {
    return `${date.getFullYear()}-${toDouble(date.getMonth())}-${toDouble(date.getDate())}`
}

export function tradesToCandlesticks(trades: TradeDTO[]): Record<SymbolId, CandlestickDTO[]> {
    return Object.entries(trades.reduce<Record<SymbolId, Record<string, CandlestickDTO>>>((acc, trade) => {
        if (!acc[trade.symbol.id]) {
            acc[trade.symbol.id] = {};
        }
        const currentSymbolDictionary = acc[trade.symbol.id];
        const date = getDate(trade.createdAt);
        if (!currentSymbolDictionary[date]) {
            currentSymbolDictionary[date] = {
                openPrice: trade.price,
                closePrice: trade.price,
                highestPrice: trade.price,
                lowestPrice: trade.price,
                symbol: trade.symbol.id,
            };
        }
        const current = currentSymbolDictionary[date];
        current.highestPrice = Math.max(current.highestPrice, trade.price);
        current.lowestPrice = Math.max(current.lowestPrice, trade.price);
        current.closePrice = trade.price;
        return acc;
    }, {})).reduce<Record<SymbolId, CandlestickDTO[]>>((acc, [symbol, values]) => {
        acc[symbol] = Object.values(values);
        return acc;
    }, {});
}
