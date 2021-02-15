import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {DeleteTradesQueryHandler} from "../../../operation/useCases/trades/DeleteTradesQueryHandler";

export class DeleteTradesAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        await this.mediator.send(DeleteTradesQueryHandler, {});
        response.status(200).send();
    }
}
