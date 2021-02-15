import {QueryHandler} from "../../../mediator/QueryHandler";
import {ILogger, ILoggerKey} from "../../../services/logger/ILogger";
import {Factory, inject} from "ts-ioc-container";
import {ILoggerFactory} from "../../../services/logger/ILoggerFactory";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";

type CreateTradeQuery = TradeResponseDTO;

type CreateTradeResponse = TradeResponseDTO;

export class CreateTradeQueryHandler extends QueryHandler<CreateTradeQuery, CreateTradeResponse> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory,
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
        this.logger = loggerFactory('CreateTradeQueryHandler');
    }

    async handle(query: CreateTradeQuery): Promise<CreateTradeResponse> {
        const trade = await this.tradesRepository.create(query);
        return trade;
    }
}
