import {ITradeSymbol, SymbolId} from "../../domain/ITradeSymbol";
import {ITradeSymbolsRepository} from "./ITradeSymbolsRepository";
import {Connection, Repository} from "typeorm";
import {TradeSymbolDTO} from "../../db/entity/TradeSymbolDTO";
import {TradeSymbolDataMapper} from "./TradeSymbolDataMapper";
import {DomainNotFoundError} from "../../domain/errors/DomainNotFoundError";

export class TradeSymbolsRepository implements ITradeSymbolsRepository {
    private readonly repository: Repository<TradeSymbolDTO>;
    private dataMapper = new TradeSymbolDataMapper();

    constructor(private connection: Connection) {
        this.repository = connection.getRepository(TradeSymbolDTO);
    }

    async fetchAll(): Promise<ITradeSymbol[]> {
        const symbols = await this.repository.find();
        return symbols.map(dto => this.dataMapper.toEntity(dto));
    }

    async findById(id: SymbolId): Promise<ITradeSymbol> {
        try {
            const symbol = await this.repository.findOneOrFail(id);
            return this.dataMapper.toEntity(symbol);
        } catch (e) {
            throw new DomainNotFoundError(`TradeSymbolsRepository[findById]: ${e.name} ${e.message}`)
        }
    }
}
