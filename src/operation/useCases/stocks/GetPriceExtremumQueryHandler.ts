import {QueryHandler} from "../../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {SymbolId} from "../../../domain/ITradeSymbol";
import {ITradeSymbolsRepository, ITradeSymbolsRepositoryKey} from "../../../repositories/symbols/ITradeSymbolsRepository";
import {RangeType} from "../../../core/RangeType";
import {IStatsServiceFactory, IStatsServiceKey} from "../../../services/stats/IStatsService";
import {NoTradesFoundError} from "../../../domain/errors/NoTradesFoundError";
import {Money} from "../../../domain/Money";

interface GetPriceExtremumQuery {
    symbol: SymbolId;
    dateRange: RangeType<Date>;
}

type GetPriceExtremumResponse = {
    min: Money;
    max: Money
};

export class GetPriceExtremumQueryHandler extends QueryHandler<GetPriceExtremumQuery, GetPriceExtremumResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(ITradeSymbolsRepositoryKey) private symbolsRepository: ITradeSymbolsRepository,
        @inject(Factory(IStatsServiceKey)) private statsServiceFactory: IStatsServiceFactory,
    ) {
        super();
    }

    async handle(query: GetPriceExtremumQuery): Promise<GetPriceExtremumResponse> {
        const symbol = await this.symbolsRepository.findById(query.symbol);
        const candlesticks = await this.tradesRepository.fetchDailyCandlesBySymbol(symbol.id, query.dateRange);
        const statsService = this.statsServiceFactory(candlesticks);
        if (!statsService.hasData) {
            throw new NoTradesFoundError(symbol.id);
        }
        return {
            max: statsService.getMaxPrice(),
            min: statsService.getMinPrice(),
        }
    }
}

