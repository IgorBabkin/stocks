import {IServiceLocator} from "ts-ioc-container";
import {Mediator} from "./mediator/Mediator";
import {RequestHandler} from "express";
import {IExpressAction} from "./framework/IExpressAction";
import {LoggerMiddleware} from "./middleware/LoggerMiddleware";
import {BadRequestError} from "./framework/errors/BadRequestError";
import {NotFoundError} from "./framework/errors/NotFoundError";
import {ILoggerKey} from "./services/logger/ILogger";

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
            const action = new actionConstructor(mediator, (prefix: string) => childContainer.resolve(ILoggerKey, prefix));
            try {
                await action.execute(request, response);
            } catch (e) {
                if (e instanceof BadRequestError) {
                    response.status(400).send(e.message);
                } else if (e instanceof NotFoundError) {
                    response.status(404).send(e.message);
                } else {
                    response.status(500).send(e.message);
                }
            } finally {
                childContainer.remove();
            }
        }
    }
}
