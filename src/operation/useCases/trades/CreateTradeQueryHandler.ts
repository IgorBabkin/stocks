import {QueryHandler} from "../../../mediator/QueryHandler";
import {inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";

type CreateTradeQuery = TradeResponseDTO;

type CreateTradeResponse = TradeResponseDTO;

export class CreateTradeQueryHandler extends QueryHandler<CreateTradeQuery, CreateTradeResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
    ) {
        super();
    }

    async handle(query: CreateTradeQuery): Promise<CreateTradeResponse> {
        const trade = await this.tradesRepository.create(query);
        return trade;
    }
}
