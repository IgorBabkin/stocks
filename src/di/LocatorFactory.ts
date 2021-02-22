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

export class LocatorFactory implements ILocatorFactory {
    private strategyFactory = new IocServiceLocatorStrategyFactory(metadataCollector);
    private hooks: IInstanceHook[] = [];

    create(env: IEnv) {
        const locator = new ServiceLocator(this.strategyFactory, this.hooks);
        locator.register(ILoggerKey, Provider.fromConstructor(Logger));
        locator.register(ISomeServiceKey, Provider.fromConstructor(SomeService));
        locator.register(IStatsServiceKey, Provider.fromConstructor(StatsService));
        return locator;
    }
}
