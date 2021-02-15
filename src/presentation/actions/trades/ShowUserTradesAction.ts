import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {ShowUserTradesQueryHandler} from "../../../operation/useCases/trades/ShowUserTradesQueryHandler";

export class ShowUserTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const trades = await this.mediator.send(ShowUserTradesQueryHandler, {
            userID: request.params.userID,
        });
        response.json(trades);
    }
}
