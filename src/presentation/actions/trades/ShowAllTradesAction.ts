import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {ShowAllTradesQueryHandler} from "../../../operation/useCases/trades/ShowAllTradesQueryHandler";

export class ShowAllTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const trades = await this.mediator.send(ShowAllTradesQueryHandler, {});
        response.json(trades);
    }
}
