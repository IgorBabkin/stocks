import {IServiceLocator} from "ts-ioc-container";
import {RequestHandler} from "express";
import {IExpressAction} from "./IExpressAction";
import {IExpressActionFactory} from "./IExpressActionFactory";
import {IMediatorFactory} from "./IMediatorFactory";
import { constructor } from "./commonTypes";

export class ExpressRequestHandlerFactory {
    constructor(
        private locator: IServiceLocator,
        private mediatorFactory: IMediatorFactory,
        private actionFactory: IExpressActionFactory,
    ) {
    }

    create(actionConstructor: constructor<IExpressAction>): RequestHandler {
        return async (request, response) => {
            const childContainer = this.locator.createContainer(request);
            const mediator = this.mediatorFactory.create(childContainer);
            const action = this.actionFactory.create(actionConstructor, mediator, childContainer);
            await action.execute(request, response);
            childContainer.remove();
        }
    }
}
