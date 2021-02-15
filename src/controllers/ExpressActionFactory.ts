import {constructor} from "../ExpressRequestHandlerFactory";
import {IExpressAction} from "../framework/IExpressAction";
import {IMediator} from "../mediator/IMediator";
import {ILoggerFactory} from "../services/logger/ILoggerFactory";
import {IExpressActionFactory} from "./IExpressActionFactory";
import {ExpressErrorHandlingAction} from "./ExpressErrorHandlingAction";
import {IServiceLocator} from "ts-ioc-container";
import {ILogger, ILoggerKey} from "../services/logger/ILogger";

export class ExpressActionFactory implements IExpressActionFactory {
    create(actionConstructor: constructor<IExpressAction>, mediator: IMediator, locator: IServiceLocator): IExpressAction {
        const loggerFactory = (prefix: string) => locator.resolve<ILogger>(ILoggerKey, prefix);
        return new ExpressErrorHandlingAction(
            new actionConstructor(mediator, loggerFactory(actionConstructor.name)),
            loggerFactory('ExpressErrorHandlingAction'),
        )
    }
}
