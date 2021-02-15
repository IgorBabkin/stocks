import {IServiceLocator} from "ts-ioc-container";
import {IMediator} from "./mediator/IMediator";
import {IMediatorFactory} from "./IMediatorFactory";
import {Mediator} from "./mediator/Mediator";
import {LoggerMiddleware} from "./middleware/LoggerMiddleware";

export class MediatorFactory implements IMediatorFactory {
    create(childContainer: IServiceLocator): IMediator {
        return new Mediator(childContainer, [
            childContainer.resolve(LoggerMiddleware)
        ]);
    }
}
