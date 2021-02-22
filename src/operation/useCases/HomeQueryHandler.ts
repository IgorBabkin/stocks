import {QueryHandler} from "../../mediator/QueryHandler";
import {args, inject} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import {ISomeService, ISomeServiceKey} from "../../services/someService/ISomeService";

interface HomeQuery {
}

interface HomeResponse {
    greeting: string;
}

export class HomeQueryHandler extends QueryHandler<HomeQuery, HomeResponse> {
    constructor(
        @inject(ILoggerKey, args('HomeQueryHandler')) private logger: ILogger,
        @inject(ISomeServiceKey) private someService: ISomeService,
    ) {
        super();
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

