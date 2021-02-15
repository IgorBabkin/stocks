import {QueryHandler} from "../../../mediator/QueryHandler";
import {inject} from "ts-ioc-container";
import {ITradesRepository, ITradesRepositoryKey} from "../../../repositories/trades/ITradesRepository";
import {TradeResponseDTO} from "./TradeResponseDTO";
import {IUsersRepository, IUsersRepositoryKey} from "../../../repositories/users/IUsersRepository";

interface GetUserTradesQuery {
    userID: string;
}

type GetUserTradesResponse = TradeResponseDTO[];

export class GetUserTradesQueryHandler extends QueryHandler<GetUserTradesQuery, GetUserTradesResponse> {
    constructor(
        @inject(ITradesRepositoryKey) private tradesRepository: ITradesRepository,
        @inject(IUsersRepositoryKey) private usersRepository: IUsersRepository,
    ) {
        super();
    }

    async handle({userID}: GetUserTradesQuery): Promise<GetUserTradesResponse> {
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

