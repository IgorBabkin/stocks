import {ITrade} from "../../domain/ITrade";
import {UserId} from "../../domain/IUser";

export const ITradesRepositoryKey = Symbol('ITradesRepository');

export interface ITradesRepository {
    fetchAll(): Promise<ITrade[]>;

    create(query: ITrade): Promise<ITrade>;

    deleteAll(): Promise<void>;

    fetchByUser(id: UserId): Promise<ITrade[]>;
}

