import {ITrade} from "../../domain/ITrade";

export const ITradesRepositoryKey = Symbol('ITradesRepository');

export interface ITradesRepository {
    fetchAll(): Promise<ITrade[]>;

    create(query: ITrade): Promise<ITrade>;
}

