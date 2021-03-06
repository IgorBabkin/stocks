import {QueryHandler} from "../../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {SymbolId} from "../../../domain/ITradeSymbol";
import {ITradeSymbolsRepository, ITradeSymbolsRepositoryKey} from "../../../repositories/symbols/ITradeSymbolsRepository";
import {Money} from "../../../domain/Money";
import {RangeType} from "../../../core/RangeType";
import {IStatsServiceFactory, IStatsServiceKey} from "../../../services/stats/IStatsService";

interface GetStatsQuery {
    dateRange: RangeType<Date>;
}

type StatsResponseDTO = { maxPriceRise: Money, maxPriceFall: Money, fluctuationsCount: number };
type GetStatsResponse = {
    symbol: SymbolId,
    stats: StatsResponseDTO | undefined
}[];

export class GetStatsQueryHandler extends QueryHandler<GetStatsQuery, GetStatsResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(ITradeSymbolsRepositoryKey) private symbolsRepository: ITradeSymbolsRepository,
        @inject(Factory(IStatsServiceKey)) private statsServiceFactory: IStatsServiceFactory,
    ) {
        super();
    }

    async handle(query: GetStatsQuery): Promise<GetStatsResponse> {
        const [symbols, candles] = await Promise.all([
            this.symbolsRepository.fetchAll(),
            this.tradesRepository.fetchDailyCandles(query.dateRange)
        ])

        return symbols.map(({id}) => {
            const statsService = this.statsServiceFactory(candles[id] || []);
            return {
                symbol: id,
                stats: statsService.hasData
                    ? {
                        maxPriceFall: statsService.getMaxPriceFall(),
                        maxPriceRise: statsService.getMaxPriceRise(),
                        fluctuationsCount: statsService.getFluctuationsCount()
                    }
                    : undefined,
            }
        });
    }
}

