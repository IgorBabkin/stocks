import {ISymbol, SymbolId} from "../../domain/ISymbol";

export const ISymbolsRepositoryKey = 'ISymbolsRepository';
export interface ISymbolsRepository {
    findById(symbol: SymbolId): Promise<ISymbol>;
}
