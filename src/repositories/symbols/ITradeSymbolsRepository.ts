import {ITradeSymbol, SymbolId} from "../../domain/ITradeSymbol";

export const ITradeSymbolsRepositoryKey = 'ITradeSymbolsRepository';

export interface ITradeSymbolsRepository {
    findById(symbol: SymbolId): Promise<ITradeSymbol>;

    fetchAll(): Promise<ITradeSymbol[]>;
}

