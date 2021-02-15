import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {GetTradesQueryHandler} from "../../../operation/useCases/trades/GetTradesQueryHandler";

export class GetTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const trades = await this.mediator.send(GetTradesQueryHandler, {});
        response.json(trades);
    }
}
