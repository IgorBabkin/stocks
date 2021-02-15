import {QueryHandler} from "../../../mediator/QueryHandler";
import {inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";
import {IUsersRepository, IUsersRepositoryKey} from "../../../repositories/users/IUsersRepository";

interface ShowUserTradesQuery {
    userID: string;
}

type ShowUserTradesResponse = TradeResponseDTO[];

export class ShowUserTradesQueryHandler extends QueryHandler<ShowUserTradesQuery, ShowUserTradesResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(IUsersRepositoryKey) private usersRepository: IUsersRepository,
    ) {
        super();
    }

    async handle({userID}: ShowUserTradesQuery): Promise<ShowUserTradesResponse> {
        const user = await this.usersRepository.findById(userID);
        const trades = await this.tradesRepository.fetchByUser(user.id);
        return trades.map((trade) => {
            return {
                ...trade,
                user: {
                    id: user.id,
                    name: user.name,
                }
            };
        });
    }
}

