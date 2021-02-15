import {QueryHandler} from "../../mediator/QueryHandler";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import {Factory, inject} from "ts-ioc-container";
import {ILoggerFactory} from "../../services/logger/ILoggerFactory";
import {ITradesRepository, ITradesRepositoryKey} from "../../repositories/trades/ITradesRepository";

interface ShowAllTradesQuery {
}

interface TradeResponseDTO {
    id: string;
}

type ShowAllTradesResponse = TradeResponseDTO[];

export class ShowAllTradesQueryHandler extends QueryHandler<ShowAllTradesQuery, ShowAllTradesResponse> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory,
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
        this.logger = loggerFactory('ShowAllTradesQueryHandler');
    }

    async handle(payload: ShowAllTradesQuery): Promise<ShowAllTradesResponse> {
        const trades = await this.tradesRepository.fetchAll();
        return trades.map(({id}) => {
            return {
                id,
            }
        });
    }
}
