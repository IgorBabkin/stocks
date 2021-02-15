import {QueryHandler} from "../../../mediator/QueryHandler";
import {ILogger, ILoggerKey} from "../../../services/logger/ILogger";
import {Factory, inject} from "ts-ioc-container";
import {ILoggerFactory} from "../../../services/logger/ILoggerFactory";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";

interface DeleteTradesQuery {
}

type DeleteTradesResponse = void;

export class DeleteTradesQueryHandler extends QueryHandler<DeleteTradesQuery, DeleteTradesResponse> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory,
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
        this.logger = loggerFactory('GetTradesQueryHandler');
    }

    async handle(payload: DeleteTradesQuery): Promise<DeleteTradesResponse> {
        return this.tradesRepository.deleteAll();
    }
}

