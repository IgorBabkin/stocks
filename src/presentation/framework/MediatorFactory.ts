import {IServiceLocator} from "ts-ioc-container";
import {IMediator} from "../../mediator/IMediator";
import {IMediatorFactory} from "./IMediatorFactory";
import {Mediator} from "../../mediator/Mediator";
import {IMiddleware} from "../../mediator/IMiddleware";
import {constructor} from "./commonTypes";

export class MediatorFactory implements IMediatorFactory {
    constructor(private middleware: constructor<IMiddleware<any>>[]) {
    }
    create(childContainer: IServiceLocator): IMediator {
        return new Mediator(childContainer, this.middleware.map(c => childContainer.resolve(c)));
    }
}
