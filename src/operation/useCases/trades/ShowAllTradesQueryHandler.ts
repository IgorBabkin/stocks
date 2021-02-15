import {QueryHandler} from "../../../mediator/QueryHandler";
import {inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";

interface ShowAllTradesQuery {
}

type ShowAllTradesResponse = TradeResponseDTO[];

export class ShowAllTradesQueryHandler extends QueryHandler<ShowAllTradesQuery, ShowAllTradesResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
    }

    async handle(payload: ShowAllTradesQuery): Promise<ShowAllTradesResponse> {
        const trades = await this.tradesRepository.fetchAll();
        return trades.map((trade) => {
            return trade;
        });
    }
}

