import {ITrade} from "../../domain/ITrade";
import {ITradesRepository} from "./ITradesRepository";
import {UserId} from "../../domain/IUser";
import {RangeType} from "../../core/RangeType";
import {ICandlestick} from "../../domain/ICandlestick";
import {Between, Connection, Repository} from "typeorm";
import {TradeDTO} from "../../db/entity/TradeDTO";
import {TradeDataMapper} from "./TradeDataMapper";
import {UserDataMapper} from "../users/UserDataMapper";
import {SymbolId} from "../../domain/ITradeSymbol";
import {Candlestick} from "../../domain/Candlestick";
import {tradesToCandlesticks} from "./candlestickHelpers";
import {TradeSymbolDataMapper} from "../symbols/TradeSymbolDataMapper";

export class TradesRepository implements ITradesRepository {
    private repository: Repository<TradeDTO>;
    private tradeDataMapper = new TradeDataMapper(new UserDataMapper(), new TradeSymbolDataMapper());

    constructor(private connection: Connection) {
        this.repository = connection.getRepository(TradeDTO);
    }

    async fetchAll(): Promise<ITrade[]> {
        const trades = await this.repository.find({relations: ["user"]});
        return trades.map((dto) => {
            return this.tradeDataMapper.toEntity(dto);
        })
    }

    async create(entity: ITrade): Promise<ITrade> {
        const dto = this.tradeDataMapper.toDTO(entity);
        const created = await this.repository.save(dto)
        return this.tradeDataMapper.toEntity(created);
    }

    async deleteAll(): Promise<void> {
        await this.repository.delete({})
    }

    async fetchByUser(id: UserId): Promise<ITrade[]> {
        const trades = await this.repository.find({
            where: [{user: {id}}]
        });
        return trades.map((dto) => {
            return this.tradeDataMapper.toEntity(dto);
        })
    }

    async fetchDailyCandles(dateRange: RangeType<Date>): Promise<Record<SymbolId, ICandlestick[]>> {
        const trades = await this.repository.find({
            where: [{createdAt: Between(dateRange.from, dateRange.to)}],
            relations: ["symbol"]
        });
        return Object.entries(tradesToCandlesticks(trades))
            .map(([symbol, candlesticks]) => [symbol, candlesticks.map((dto) => new Candlestick(
                dto.symbol, dto.openPrice, dto.closePrice, dto.highestPrice, dto.lowestPrice,
            ))])
            .reduce((acc, [symbol, candlesticks]) => {
                acc[symbol as SymbolId] = candlesticks;
                return acc;
            }, {})
    }

    /*
        SELECT
            start_table.start_price,
            end_table.end_price,
            start_table.created_date
        FROM (
            SELECT DISTINCT ON (created_date)
                created_date,
                price as start_price
            FROM (
                SELECT price, id, date(created_at) as created_date
                FROM trades
                WHERE symbol_id = 'EURUSD'
                ORDER BY created_at ASC
            ) AS t1
        ) as start_table
        INNER JOIN
        (
            SELECT DISTINCT ON (created_date)
                created_date,
                price as end_price
            FROM (
                SELECT price, id, date(created_at) as created_date
                FROM trades
                WHERE symbol_id = 'EURUSD'
                ORDER BY created_at DESC
            ) AS t1
        ) as end_table
        ON start_table.created_date = end_table.created_date
    */
    async fetchDailyCandlesBySymbol(symbol: SymbolId, dateRange: RangeType<Date>): Promise<ICandlestick[]> {
        const trades = await this.repository.find({
            where: [{
                createdAt: Between(dateRange.from, dateRange.to),
                symbol: {id: symbol}
            }],
            relations: ["symbol"]
        });
        const candlesticks = tradesToCandlesticks(trades)[symbol];
        return candlesticks.map((dto) => new Candlestick(
            dto.symbol, dto.openPrice, dto.closePrice, dto.highestPrice, dto.lowestPrice,
        ));
    }
}
