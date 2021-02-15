import {QueryHandler} from "../../../mediator/QueryHandler";
import {inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";

interface GetTradesQuery {
}

type GetTradesResponse = TradeResponseDTO[];

export class GetTradesQueryHandler extends QueryHandler<GetTradesQuery, GetTradesResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
    }

    async handle(payload: GetTradesQuery): Promise<GetTradesResponse> {
        const trades = await this.tradesRepository.fetchAll();
        return trades.map((trade) => {
            return trade;
        });
    }
}

