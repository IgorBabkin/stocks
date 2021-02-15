import {IExpressAction} from "../framework/IExpressAction";
import {IMediator} from "../mediator/IMediator";
import {constructor} from "../ExpressRequestHandlerFactory";
import {IServiceLocator} from "ts-ioc-container";

export interface IExpressActionFactory {
    create(actionConstructor: constructor<IExpressAction>, mediator: IMediator, locator: IServiceLocator): IExpressAction;
}
