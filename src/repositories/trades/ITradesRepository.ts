import {ITrade} from "../../domain/ITrade";
import {UserId} from "../../domain/IUser";
import {SymbolId} from "../../domain/ITradeSymbol";
import {RangeType} from "../../core/RangeType";
import {ICandlestick} from "../../domain/ICandlestick";

export const ITradesRepositoryKey = Symbol('ITradesRepository');

export interface ITradesRepository {
    fetchAll(dateRange?: RangeType<Date>): Promise<ITrade[]>;

    create(query: ITrade): Promise<ITrade>;

    deleteAll(): Promise<void>;

    fetchByUser(id: UserId): Promise<ITrade[]>;

    fetchDailyCandles(dateRange: RangeType<Date>): Promise<Record<SymbolId, ICandlestick[]>>;

    fetchDailyCandlesBySymbol(symbol: SymbolId, dateRange: RangeType<Date>): Promise<ICandlestick[]>;
}

