import {IExpressAction} from "./IExpressAction";
import {IMediator} from "../../mediator/IMediator";
import {IServiceLocator} from "ts-ioc-container";
import {constructor} from "./commonTypes";

export interface IExpressActionFactory {
    create(actionConstructor: constructor<IExpressAction>, mediator: IMediator, locator: IServiceLocator): IExpressAction;
}
