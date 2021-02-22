import {QueryHandler} from "../../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {SymbolId} from "../../../domain/ISymbol";
import {ISymbolsRepository, ISymbolsRepositoryKey} from "../../../repositories/symbols/ISymbolsRepository";
import {RangeType} from "../../../core/RangeType";
import {IStatsServiceFactory, IStatsServiceKey} from "../../../services/stats/IStatsService";
import {IPriceExtremum} from "../../../domain/IPriceExtremum";

interface GetPriceExtremumQuery {
    symbol: SymbolId;
    dateRange: RangeType<Date>;
}

type GetPriceExtremumResponse = IPriceExtremum;

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
        return this.tradesRepository.findPriceExtremum(symbol.id, query.dateRange);
    }
}

