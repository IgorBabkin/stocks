import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {GetPriceExtremumQueryHandler} from "../../../operation/useCases/stocks/GetPriceExtremumQueryHandler";
import {toDecimal} from "../../../domain/Money";
import {RangeType} from "../../../core/RangeType";
import {NoTradesFoundError} from "../../../domain/errors/NoTradesFoundError";

export class GetPriceExtremumAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;
        const {start, end} = request.query;
        try {
            const extremum = await this.mediator.send(GetPriceExtremumQueryHandler, {
                symbol,
                dateRange: new RangeType(new Date(start as string), new Date(end as string))
            });
            return response.json({
                symbol,
                highest: toDecimal(extremum.max, 2),
                lowest: toDecimal(extremum.min, 2)
            });
        } catch (e) {
            if (e instanceof NoTradesFoundError) {
                return response.json({
                    message: "There are no trades in the given date range"
                })
            }

            throw e;
        }
    }
}
