import {ITrade} from "../../domain/ITrade";
import {ITradesRepository} from "./ITradesRepository";

export class TestTradesRepository implements ITradesRepository {
    fetchAll(): Promise<ITrade[]> {
        return Promise.resolve([{
            id: '21',
            price: 1234,
            shares: 20,
            symbol: 'USD',
            timestamp: new Date(),
            type: 'buy',
            user: {
                id: '2',
                name: 'Daniel',
            }
        }]);
    }

    create(query: ITrade): Promise<ITrade> {
        return Promise.resolve({
            id: '21',
            price: 1234,
            shares: 20,
            symbol: 'USD',
            timestamp: new Date(),
            type: 'buy',
            user: {
                id: '2',
                name: 'Daniel',
            }
        });
    }

    deleteAll(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
