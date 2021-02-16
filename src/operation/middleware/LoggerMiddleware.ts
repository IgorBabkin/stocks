import {Middleware} from "../../mediator/Middleware";
import {inject} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import {args} from "ts-ioc-container/cjm/helpers";

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
