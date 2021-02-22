import {Request, Response} from "express";
import {IMediator} from "../../../mediator/IMediator";
import {IExpressAction} from "../../framework/IExpressAction";
import {ILogger} from "../../../services/logger/ILogger";
import {RangeType} from "../../../core/RangeType";
import {GetStatsQueryHandler} from "../../../operation/useCases/stocks/GetStatsQueryHandler";

export class GetStatsAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<Response> {
        const {start, end} = request.query;
        const stats = await this.mediator.send(GetStatsQueryHandler, {
            dateRange: new RangeType(new Date(start as string), new Date(end as string))
        });

        return response.json(stats.map(({symbol, stats}) => {
            return stats
                ? {
                    symbol,
                    fluctuations: stats.fluctuationsCount,
                    max_rise: stats.maxPriceRise,
                    max_fall: stats.maxPriceFall,
                }
                : {
                    symbol,
                    message: "There are no trades in the given date range"
                }
        }))
    }
}
