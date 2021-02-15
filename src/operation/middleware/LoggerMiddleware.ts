import {Middleware} from "../../mediator/Middleware";
import {Factory, inject} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import {ILoggerFactory} from "../../services/logger/ILoggerFactory";

export class LoggerMiddleware extends Middleware<any> {
    private logger: ILogger;

    constructor(
        @inject(Factory(ILoggerKey)) loggerFactory: ILoggerFactory
    ) {
        super();
        this.logger = loggerFactory('LoggerMiddleware');
    }

    async preProcess(query: any): Promise<void> {
        this.logger.log('preprocess', query);
    }
}
