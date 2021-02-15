import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {GetPriceExtremumQueryHandler} from "../../../operation/useCases/stocks/GetPriceExtremumQueryHandler";
import {toDecimal} from "../../../domain/Money";
import {RangeType} from "../../../core/RangeType";

export class GetPriceExtremumAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        const symbol = request.params.symbol;
        const {start, end} = request.query;
        const extremum = await this.mediator.send(GetPriceExtremumQueryHandler, {
            symbol,
            dateRange: new RangeType(new Date(start as string), new Date(end as string))
        });
        if (extremum) {
            response.json({
                symbol,
                highest: toDecimal(extremum.maxPrice, 2),
                lowest: toDecimal(extremum.minPrice, 2)
            });
        } else {
            response.json({
                message: "There are no trades in the given date range"
            })
        }
    }
}
