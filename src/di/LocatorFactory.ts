import {
    IInstanceHook,
    IocServiceLocatorStrategyFactory,
    metadataCollector,
    Provider,
    ServiceLocator
} from "ts-ioc-container";
import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";
import {ILoggerKey} from "../services/logger/ILogger";
import {Logger} from "../services/logger/Logger";
import {ISomeServiceKey} from "../services/someService/ISomeService";
import {SomeService} from "../services/someService/SomeService";
import {StatsService} from "../services/stats/StatsService";
import {IStatsServiceKey} from "../services/stats/IStatsService";
import {ITradesRepositoryKey} from "../repositories/trades/ITradesRepository";
import {TradesRepository} from "../repositories/trades/TradesRepository";
import {IUsersRepositoryKey} from "../repositories/users/IUsersRepository";
import {Connection} from "typeorm";
import {UsersRepository} from "../repositories/users/UsersRepository";
import {ITradeSymbolsRepositoryKey} from "../repositories/symbols/ITradeSymbolsRepository";
import {TradeSymbolsRepository} from "../repositories/symbols/TradeSymbolsRepository";

export class LocatorFactory implements ILocatorFactory {
    private strategyFactory = new IocServiceLocatorStrategyFactory(metadataCollector);
    private hooks: IInstanceHook[] = [];

    constructor(private connection: Connection) {
    }

    create(env: IEnv) {
        const locator = new ServiceLocator(this.strategyFactory, this.hooks);
        locator.register(ILoggerKey, Provider.fromConstructor(Logger));
        locator.register(ISomeServiceKey, Provider.fromConstructor(SomeService));
        locator.register(IStatsServiceKey, Provider.fromConstructor(StatsService));
        locator.register(ITradesRepositoryKey, Provider.fromConstructor(TradesRepository).withArgs(this.connection).asScoped());
        locator.register(IUsersRepositoryKey, Provider.fromConstructor(UsersRepository).withArgs(this.connection).asScoped());
        locator.register(ITradeSymbolsRepositoryKey, Provider.fromConstructor(TradeSymbolsRepository).withArgs(this.connection).asScoped());
        return locator;
    }
}
