import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {GetUserTradesQueryHandler} from "../../../operation/useCases/trades/GetUserTradesQueryHandler";

export class GetUserTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const trades = await this.mediator.send(GetUserTradesQueryHandler, {
            userID: request.params.userID,
        });
        response.json(trades);
    }
}
