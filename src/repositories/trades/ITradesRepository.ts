import {ITrade} from "../../domain/ITrade";
import {UserId} from "../../domain/IUser";
import {SymbolId} from "../../domain/ISymbol";
import {RangeType} from "../../core/RangeType";
import {ICandlestick} from "../../domain/ICandlestick";
import {IPriceExtremum} from "../../domain/IPriceExtremum";

export const ITradesRepositoryKey = Symbol('ITradesRepository');

export interface ITradesRepository {
    fetchAll(dateRange?: RangeType<Date>): Promise<ITrade[]>;

    create(query: ITrade): Promise<ITrade>;

    deleteAll(): Promise<void>;

    fetchByUser(id: UserId): Promise<ITrade[]>;

    fetchBySymbol(id: SymbolId, dateRange?: RangeType<Date>): Promise<ITrade[]>;

    fetchDailyCandles(dateRange: RangeType<Date>): Promise<ICandlestick[]>;

    findPriceExtremum(symbol: SymbolId, dateRange: RangeType<Date>): Promise<IPriceExtremum>;
}

