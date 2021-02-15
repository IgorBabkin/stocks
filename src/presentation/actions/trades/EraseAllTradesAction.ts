import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {EraseAllTradesQueryHandler} from "../../../operation/useCases/trades/EraseAllTradesQueryHandler";

export class EraseAllTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        await this.mediator.send(EraseAllTradesQueryHandler, {});
        response.status(200).send();
    }
}
