import {ITrade} from "../../domain/ITrade";
import {ITradesRepository} from "./ITradesRepository";

export class TestTradesRepository implements ITradesRepository {
    fetchAll(): Promise<ITrade[]> {
        return Promise.resolve([{
            id: '21',
        }]);
    }
}
