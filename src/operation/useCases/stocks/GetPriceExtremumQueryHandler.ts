import {QueryHandler} from "../../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {SymbolId} from "../../../domain/ISymbol";
import {ISymbolsRepository, ISymbolsRepositoryKey} from "../../../repositories/symbols/ISymbolsRepository";
import {IHistoryServiceFactory, IHistoryServiceKey} from "../../../services/historyService/IHistoryService";
import {Money} from "../../../domain/Money";
import {RangeType} from "../../../core/RangeType";

interface GetPriceExtremumQuery {
    symbol: SymbolId;
    dateRange: RangeType<Date>;
}

type GetPriceExtremumResponse = { minPrice: Money, maxPrice: Money } | undefined;

export class GetPriceExtremumQueryHandler extends QueryHandler<GetPriceExtremumQuery, GetPriceExtremumResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(ISymbolsRepositoryKey) private symbolsRepository: ISymbolsRepository,
        @inject(Factory(IHistoryServiceKey)) private historyServiceFactory: IHistoryServiceFactory,
    ) {
        super();
    }

    async handle(query: GetPriceExtremumQuery): Promise<GetPriceExtremumResponse> {
        const symbol = await this.symbolsRepository.findById(query.symbol);
        const trades = await this.tradesRepository.fetchBySymbol(symbol.id);
        if (trades.length === 0) {
            return undefined;
        }
        const historyService = this.historyServiceFactory(trades);
        return {
            minPrice: historyService.getMinPrice(query.dateRange),
            maxPrice: historyService.getMaxPrice(query.dateRange),
        };
    }
}

