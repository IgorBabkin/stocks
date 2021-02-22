import {Middleware} from "../../mediator/Middleware";
import {args, inject} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";

export class LoggerMiddleware extends Middleware<any> {
    constructor(
        @inject(ILoggerKey, args('LoggerMiddleware')) private logger: ILogger,
    ) {
        super();
    }

    async preProcess(query: any): Promise<void> {
        this.logger.log('preprocess', query);
    }
}
