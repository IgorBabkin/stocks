import {QueryHandler} from "../../mediator/QueryHandler";
import {Factory, inject} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import {ILoggerFactory} from "../../services/logger/ILoggerFactory";
import {ISomeService, ISomeServiceKey} from "../../services/someService/ISomeService";

interface HomeQuery {
}

interface HomeResponse {
    greeting: string;
}

export class HomeQueryHandler extends QueryHandler<HomeQuery, HomeResponse> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory,
        @inject(ISomeServiceKey) private someService: ISomeService,
    ) {
        super();
        this.logger = loggerFactory('HomeQueryHandler');
    }

    async preHandle(payload: any): Promise<void> {
        this.logger.log('prehandle', payload)
    }

    async handle(payload: any): Promise<HomeResponse> {
        return {
            greeting: `Hello ${await this.someService.findSmth()}`,
        }
    }
}

