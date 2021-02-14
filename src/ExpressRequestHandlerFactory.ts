import {IServiceLocator} from "ts-ioc-container";
import {Mediator} from "./mediator/Mediator";
import {RequestHandler} from "express";
import {IExpressAction} from "./controllers/IExpressAction";
import {LoggerMiddleware} from "./middleware/LoggerMiddleware";

type constructor<T> = new (...args: any[]) => T;

export class ExpressRequestHandlerFactory {
    constructor(private locator: IServiceLocator) {
    }

    create(actionConstructor: constructor<IExpressAction>): RequestHandler {
        return async (request, response) => {
            const childContainer = this.locator.createContainer(request);
            const mediator = new Mediator(childContainer, [
                childContainer.resolve(LoggerMiddleware)
            ]);
            const action = new actionConstructor(mediator);
            await action.execute(request, response);
            childContainer.remove();
        }
    }
}
