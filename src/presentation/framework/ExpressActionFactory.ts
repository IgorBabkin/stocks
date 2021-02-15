import {IExpressAction} from "./IExpressAction";
import {IMediator} from "../../mediator/IMediator";
import {IExpressActionFactory} from "./IExpressActionFactory";
import {ExpressErrorHandlingAction} from "./error/ExpressErrorHandlingAction";
import {IServiceLocator} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../../services/logger/ILogger";
import { constructor } from "./commonTypes";
import {IErrorConfig} from "./error/IErrorConfig";

export class ExpressActionFactory implements IExpressActionFactory {
    constructor(private errorConfig: IErrorConfig) {
    }
    create(actionConstructor: constructor<IExpressAction>, mediator: IMediator, locator: IServiceLocator): IExpressAction {
        const loggerFactory = (prefix: string) => locator.resolve<ILogger>(ILoggerKey, prefix);
        return new ExpressErrorHandlingAction(
            new actionConstructor(mediator, loggerFactory(actionConstructor.name)),
            loggerFactory('ExpressErrorHandlingAction'),
            this.errorConfig
        )
    }
}
