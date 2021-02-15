import {QueryHandler} from "../../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {SymbolId} from "../../../domain/ISymbol";
import {ISymbolsRepository, ISymbolsRepositoryKey} from "../../../repositories/symbols/ISymbolsRepository";
import {Money} from "../../../domain/Money";
import {RangeType} from "../../../core/RangeType";
import {IStatsServiceFactory, IStatsServiceKey} from "../../../services/stats/IStatsService";

interface GetPriceExtremumQuery {
    symbol: SymbolId;
    dateRange: RangeType<Date>;
}

type GetPriceExtremumResponse = { minPrice: Money, maxPrice: Money } | undefined;

export class GetPriceExtremumQueryHandler extends QueryHandler<GetPriceExtremumQuery, GetPriceExtremumResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(ISymbolsRepositoryKey) private symbolsRepository: ISymbolsRepository,
        @inject(Factory(IStatsServiceKey)) private statsServiceFactory: IStatsServiceFactory,
    ) {
        super();
    }

    async handle(query: GetPriceExtremumQuery): Promise<GetPriceExtremumResponse> {
        const symbol = await this.symbolsRepository.findById(query.symbol);
        const trades = await this.tradesRepository.fetchBySymbol(symbol.id, query.dateRange);
        if (trades.length === 0) {
            return undefined;
        }
        const historyService = this.statsServiceFactory(trades);
        return {
            minPrice: historyService.getMinPrice(),
            maxPrice: historyService.getMaxPrice(),
        };
    }
}

