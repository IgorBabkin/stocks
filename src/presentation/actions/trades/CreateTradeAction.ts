import {IExpressAction} from "../../framework/IExpressAction";
import {IMediator} from "../../../mediator/IMediator";
import {ILogger} from "../../../services/logger/ILogger";
import {Request, Response} from "express";
import {CreateTradeQueryHandler} from "../../../operation/useCases/trades/CreateTradeQueryHandler";
import {fromDecimal} from "../../../domain/Money";

export class CreateTradeAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const postParams = request.body;
        const trade = await this.mediator.send(CreateTradeQueryHandler, {
            "id": postParams.id?.toString(),
            "type": postParams.type,
            "user": {
                "id": postParams.user?.id.toString(),
                "name": postParams.user?.name,
            },
            "symbol": postParams.symbol,
            "shares": postParams.shares,
            "price": fromDecimal(postParams.price, 2),
            "timestamp": new Date(postParams.timestamp)
        });
        response.status(201).json(trade);
    }
}
