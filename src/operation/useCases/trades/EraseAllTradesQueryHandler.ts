import {QueryHandler} from "../../../mediator/QueryHandler";
import {ILogger, ILoggerKey} from "../../../services/logger/ILogger";
import {Factory, inject} from "ts-ioc-container";
import {ILoggerFactory} from "../../../services/logger/ILoggerFactory";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";

interface EraseAllTradesQuery {
}

type EraseAllTradesResponse = void;

export class EraseAllTradesQueryHandler extends QueryHandler<EraseAllTradesQuery, EraseAllTradesResponse> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory,
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
        this.logger = loggerFactory('ShowAllTradesQueryHandler');
    }

    async handle(payload: EraseAllTradesQuery): Promise<EraseAllTradesResponse> {
        return this.tradesRepository.deleteAll();
    }
}

