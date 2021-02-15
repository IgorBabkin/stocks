import {IServiceLocator} from "ts-ioc-container";
import {IMediator} from "../../mediator/IMediator";

export interface IMediatorFactory {
    create(childContainer: IServiceLocator): IMediator;
}
